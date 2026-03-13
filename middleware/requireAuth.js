const jwt = require("jsonwebtoken");
const User = require("../models/Userschema");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("_id");
    // console.log(user)

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
     console.error("JWT verification failed:", err.message);
    res.status(401).json({ error: "Request not authorized" });
  }
};

module.exports = requireAuth;