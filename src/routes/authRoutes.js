const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Update banner image
router.post('/banner/:id', authController.updateBannerImage);

// Get banner image
router.get('/banner/:id', authController.getBannerImage);

module.exports = router;
