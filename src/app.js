// src/app.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const path = require('path');

const app = express();

app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api', newsRoutes);

// Export the configured app without starting it
module.exports = app;
