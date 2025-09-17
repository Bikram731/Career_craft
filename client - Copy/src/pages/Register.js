import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
const checkPasswordStrength = (pass) => {
  if (pass.length === 0) return '';
  if (pass.length < 6) return 'Weak';
  const hasUpper = /[A-Z]/.test(pass);
  const hasLower = /[a-z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  const hasSpecial = /[!@#$%^&*]/.test(pass);

  if (hasUpper && hasLower && hasNumber && hasSpecial && pass.length >= 8) return 'Strong';
  return 'Medium';
};
const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
    setStrength(checkPasswordStrength(value));
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuggestion('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setSuggestion('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        if (data.suggestion) {
          setSuggestion(data.suggestion);
        }
      } else {
        setSuccess(data.message);
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="space-x-0 min-h-screen h-full w-full bg-gradient-to-br from-emerald-500 via-indigo-900 to-slate-600 text-white flex flex-row items-center justify-center px-4">
    <div className="flex justify-center items-center w-full md:w-1/2 px-4 py-10 md:py-0 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl shadow-xl max-w-md w-full space-y-4 mt-0 sm:mt-5"
      >
        <h2 className="text-2xl font-bold text-orange-300 text-center">Create Your Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
        />
        <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter a Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 pr-9 rounded bg-slate-700 text-white placeholder-gray-400"
        />
        <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-orange-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <p className={`mt-1 text-sm font-medium ${
            strength === 'Weak' ? 'text-red-500' :
            strength === 'Medium' ? 'text-yellow-500' :
            strength === 'Strong' ? 'text-green-500' : ''
          }`}>
           {strength && `Password Strength: ${strength}`}
          </p>
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-800 bg-opacity-20 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {suggestion && (
          <div className="text-yellow-300 text-sm">
            💡 Try: <code className="bg-slate-700 px-2 py-1 rounded">{suggestion}</code>
          </div>
        )}

        {success && (
          <div className="text-green-400 text-sm bg-green-800 bg-opacity-20 px-3 py-2 rounded">
            ✅ {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-400 hover:bg-orange-500 text-black font-bold py-2 px-4 rounded transition"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="text-sm mt-4 text-center text-gray-500">
            Already have an account?
            <a href="/login" className="text-indigo-600 hover:underline ml-1">
                Login
           </a>
        </p>
      </form>
      </div>
    </div>
  );
};

export default Register;