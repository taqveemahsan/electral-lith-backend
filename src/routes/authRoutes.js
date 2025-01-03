const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Update banner image
router.post('/banner/:id', authController.updateBannerImage);

// Get banner image
router.get('/banner/:id', authController.getBannerImage);

// Update banner image
router.post('/contactus/add', authController.addContactUs);

// Get banner image
router.get('/contactus/list', authController.getContactUsList);

// Get banner image
router.get('/contactus/:id', authController.getContactUsById);

module.exports = router;
