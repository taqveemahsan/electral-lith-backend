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

// Add FAQ
router.post('/faq', authController.addFAQ); 

// Get FAQ list
router.get('/faq', authController.getFAQList); 

// Get FAQ by ID
router.get('/faq/:id', authController.getFAQById);

// Update FAQ
router.put('/faq/:id', authController.updateFAQ); 

// Delete FAQ
router.delete('/faq/:id', authController.deleteFAQ); 

// Add glossary term
router.post('/glossary', authController.addGlossaryTerm); 

// Get glossary list
router.get('/glossary', authController.getGlossaryList); 

// Get glossary by ID
router.get('/glossary/:id', authController.getGlossaryById); 

// Update glossary term
router.put('/glossary/:id', authController.updateGlossaryTerm); 

// Delete glossary term
router.delete('/glossary/:id', authController.deleteGlossaryTerm); 

module.exports = router;
