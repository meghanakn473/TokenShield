const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = require('./app');  // Import the app configuration
connectDB();

// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
