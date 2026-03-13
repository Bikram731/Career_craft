const express = require('express');
const router = express.Router();
const User = require('../models/Userschema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Helper function to check password strength
function isStrongPassword(password) {
  const minLength = 8;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
  return password.length >= minLength && regex.test(password);
}
// function to generate a strong password
function generateStrongPassword(length = 12) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
}
// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: 'Password too weak. Must be at least 8 characters long, with uppercase, lowercase, number, and special character.',
        suggestion: generateStrongPassword()
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    // console.log("User found:", user);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
     const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email,profileCompleted: user.profileCompleted },           
      process.env.JWT_SECRET || 'mysecretkey',       
      { expiresIn: '3d' }                        
    );
    const fullUser = await User.findById(user._id)
      .select('-password')
      .populate('savedCareers');
    // For now, just send success. Later add JWT token.
    return res.status(200).json({ message: 'Login successful',
      token,
      user: fullUser
     });
  } catch (err) {
    // console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;