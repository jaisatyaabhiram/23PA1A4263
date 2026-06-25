// src/app.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const scheduleRoutes = require('./routes/scheduleRoutes');
const config = require('./config');

// Import logging middleware
const loggingMiddleware = require('./logging-middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply logging middleware
app.use(loggingMiddleware.middleware());

// Routes
app.use('/api/schedules', scheduleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    if (loggingMiddleware.log) {
        loggingMiddleware.log('backend', 'error', 'middleware', 
            `Error: ${err.message}`);
    }
    res.status(500).json({ error: err.message });
});

module.exports = app;