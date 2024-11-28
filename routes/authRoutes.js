const express = require('express');
const { register, login, logout, getProfile } = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);

// Admin-specific route (protected and role-based)
router.get('/admin', protect, authorizeRoles('Admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

// Moderator-specific route (protected and role-based)
router.get('/moderator', protect, authorizeRoles('Moderator'), (req, res) => {
  res.json({ message: 'Welcome Moderator!' });
});

module.exports = router;
