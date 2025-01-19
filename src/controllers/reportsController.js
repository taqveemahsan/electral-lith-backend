// src/controllers/authController.js
const reportsService = require('../services/reportsService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ResponseHandler = require('../common/responseHandler');
const messages = require('../common/messageEnum');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/reports/'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extract the file extension
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5 MB
}).single('reportsFile');

exports.addReport = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return ResponseHandler.error(res, 400, "File upload error", err.message);
        }

        try {
            const { title, description } = req.body;

            // Validate required fields
            if (!title || !description) {
                return ResponseHandler.error(res, 400, "Missing required fields");
            }

            let mediaType = null;
            let downloadLink = null;

            // Handle media file if provided
            if (req.file) {
                mediaType = req.file.mimetype.startsWith("image/") ? "image" : "video";
                downloadLink = path.join("/uploads/reports/", req.file.filename); // Relative path for media
            }

            // Add the news
            await reportsService.addReport({ title, description, downloadLink, mediaType });
            ResponseHandler.success(res, 201, messages.NEWS_ADDED);
        } catch (error) {
            ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
        }
    });
};


// API to get the banner image
exports.getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const mediaUrl = await reportsService.getReportById(id);
    ResponseHandler.success(res, 200, messages.BANNER_RETRIEVED, { mediaUrl });
  } catch (error) {
    ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
  }
};

// NEW: API to delete a report
exports.deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReport = await reportsService.deleteReport(id);
    if (!deletedReport) {
      return ResponseHandler.error(res, 404, 'Report not found');
    }
    ResponseHandler.success(res, 200, messages.REPORT_DELETED, deletedReport);
  } catch (error) {
    ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
  }
};

/**
 * Edit an existing news item.
 */
exports.updateReport = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return ResponseHandler.error(res, 400, "File upload error", err.message);
        }

        const { id } = req.params; // Get news ID from the URL
        const { title, description } = req.body; // Get updated data from the body

        try {
            // Find the existing news item
            const existingReport = await reportsService.getReportById(id);

            if (!existingReport) {
                return ResponseHandler.error(res, 404, "News not found");
            }

            // Prepare updated data with fallback to existing values
            const updatedData = {
                title: title || existingReport.title,
                description: description || existingReport.description
            };

            // Handle new media file if provided
            if (req.file) {
                const mediaUrl = path.join("/uploads/reports/", req.file.filename);

                // Delete the old media file if it exists
                if (existingReport.mediaUrl) {
                    const oldMediaPath = path.join(__dirname, "../../", existingReport.mediaUrl);
                    if (fs.existsSync(oldMediaPath)) {
                        fs.unlinkSync(oldMediaPath); // Delete the old file
                    }
                }

                updatedData.downloadLink = mediaUrl;
            }

            // Update the news item
            await reportsService.updateReport(id, updatedData);

            ResponseHandler.success(res, 200, messages.NEWS_UPDATED);
        } catch (error) {
            ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
        }
    });
};

// // NEW: API to update a report
// exports.updateReport = async (req, res) => {
//   const { id } = req.params;

//   upload(req, res, async (err) => {
//     if (err) {
//       return ResponseHandler.error(res, 400, 'File upload error', err.message);
//     }

//     try {
//       const updateData = req.body;
//       if (req.file) {
//         updateData.file = req.file;
//       }

//       const updatedReport = await reportsService.updateReport(id, updateData);
//       if (!updatedReport) {
//         return ResponseHandler.error(res, 404, 'Report not found');
//       }

//       ResponseHandler.success(res, 200, messages.REPORT_UPDATED, updatedReport);
//     } catch (error) {
//       ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
//     }
//   });
// };

// API to get the list of reports
exports.getReportsList = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const reports = await reportsService.getReportsList({ page: parseInt(page), limit: parseInt(limit) });
    ResponseHandler.success(res, 200, messages.REPORTS_LIST, reports);
  } catch (error) {
    ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
  }
};