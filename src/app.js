// src/app.js
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");
const reportRoutes = require('./routes/reportsRoutes');
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api", newsRoutes);
app.use('/api', reportRoutes);

// Export the configured app without starting it
module.exports = app;
