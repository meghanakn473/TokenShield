const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getProfile, updateProfile, deleteAccount } = require('../controllers/userController');

const router = express.Router();

// Protected routes for user profile
router.get('/profile', protect, getProfile);      // View profile
router.put('/profile', protect, updateProfile);   // Update profile
router.delete('/account', protect, deleteAccount); // Delete account

module.exports = router;
