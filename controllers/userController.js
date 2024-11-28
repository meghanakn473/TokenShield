const User = require('../models/User');

// Get user profile (this function is already partly covered in your existing `getProfile` route)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Update user profile (can include fields like username, email, etc.)
const updateProfile = async (req, res) => {
  const { username, email, role } = req.body;
  try {
    // Find the user and update the profile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update the user's information
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    // Save the updated user
    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Update failed', details: error.message });
  }
};

// Delete user account
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Account deletion failed', details: error.message });
  }
};

module.exports = { getProfile, updateProfile, deleteAccount };
