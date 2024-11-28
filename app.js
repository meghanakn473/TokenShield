const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');  // Import user routes
const { errorHandler } = require('./middlewares/errorMiddleware');
const { protect } = require('./middlewares/authMiddleware');  // Protect middleware for authenticated routes

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes);  // Authentication routes (register, login, etc.)

// Protected Routes
app.use('/api/user', protect, userRoutes);  // User-related routes, protected by authentication

// Error handling middleware (must be placed at the end)
app.use(errorHandler);

module.exports = app;
