const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'User', // Default role is 'User'
        });

        // Log the user details to the console for debugging
        console.log('User registered:', newUser);

        // Save the new user
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Log in an existing user
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Log out the user (client-side token handling is required)
const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { lastLogout: new Date() });
        res.json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Logout failed', details: error.message });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Export all functions
module.exports = { register, login, logout, getProfile };
