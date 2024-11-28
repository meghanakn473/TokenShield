const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming the User model is imported from the correct location

// Protect middleware to ensure the user is authenticated
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers
  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.id); // Get user based on decoded token

    if (user.lastLogout && decoded.iat * 1000 < new Date(user.lastLogout).getTime()) {
      return res.status(401).json({ error: 'Token expired due to logout' });
    }

    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Token verification failed' }); // Handle verification failure
  }
};

// authorizeRoles middleware to check if the user has a specific role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) { // Check if the user's role is authorized
      return res.status(403).json({ error: 'Access denied' }); // Forbidden if role does not match
    }
    next(); // Proceed to the next middleware or route handler
  };
};

module.exports = { protect, authorizeRoles }; // Export the middleware functions
