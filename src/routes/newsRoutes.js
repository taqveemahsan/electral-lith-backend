// src/routes/authRoutes.js
const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

// Get all news (paginated)
router.get('/news', newsController.getNewsList);

// Get news by ID
router.get('/news/:id', newsController.getNewsById);

// Add new news
router.post('/news', newsController.addNews);

// Edit existing news
router.put('/news/:id', newsController.editNews);

// Delete news by ID
router.delete('/news/:id', newsController.deleteNews);

module.exports = router;
