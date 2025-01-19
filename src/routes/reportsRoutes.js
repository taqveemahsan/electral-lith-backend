// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/reportsController');

// Route to add a new report
router.post('/report', authController.addReport);

// Route to get the list of reports
router.get('/reports', authController.getReportsList);

// Route to delete a report by ID
router.delete('/report/:id', authController.deleteReport);

// Route to delete a report by ID
router.get('/report/:id', authController.getReportById);

// Route to update a report by ID
router.put('/report/:id', authController.updateReport);

module.exports = router;
