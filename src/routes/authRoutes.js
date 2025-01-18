const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Create User
router.post('/user/signup', authController.createAccount);

// Login Account
router.get('/user/login', authController.loginAccount);

// Update banner image
router.post('/banner/:id', authController.updateBannerImage);

// Get banner image
router.get('/banner/:id', authController.getBannerImage);

// Update second banner image
router.post('/Secondbanner/:id', authController.updateSecondBannerImage);

// Get second banner image
router.get('/Secondbanner/:id', authController.getSecondBannerImage);

// Update third banner image
router.post('/Thirdbanner/:id', authController.updateThirdBannerImage);

// Get third banner image
router.get('/Thirdbanner/:id', authController.getThirdBannerImage);

// Update banner image
router.post('/contactus/add', authController.addContactUs);

// Get banner image
router.get('/contactus/list', authController.getContactUsList);

// Get banner image
router.get('/contactus/:id', authController.getContactUsById);

// Update banner image
router.post('/jobs/add', authController.addJob);

// Get banner image
router.get('/jobs/list', authController.getJobList);

// Get banner image
router.get('/jobs/:id', authController.getJobById);

module.exports = router;
