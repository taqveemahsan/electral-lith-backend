// src/controllers/authController.js
const userService = require('../services/userService');
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
    cb(null, path.join(__dirname, '../../uploads/banners/'));
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
}).single('bannerImage');

// API to update the banner image
exports.updateBannerImage = async (req, res) => {
  const { id } = req.params; // Get banner ID from URL

  // Handle file upload for new banner image
  upload(req, res, async (err) => {
    if (err) {
      return ResponseHandler.error(res, 400, 'File upload error', err.message);
    }

    try {
      if (!req.file) {
        return ResponseHandler.error(res, 400, 'No file uploaded');
      }

      // Call the service to update the banner image
      const updatedBanner = await userService.updateBannerImage(id, req.file);
      ResponseHandler.success(res, 200, messages.BANNER_UPDATED, updatedBanner);
    } catch (error) {
      ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
    }
  });
};

// API to get the banner image
exports.getBannerImage = async (req, res) => {
  const { id } = req.params; // Get banner ID from URL

  try {
    const mediaUrl = await userService.getBannerImage(id);
    ResponseHandler.success(res, 200, messages.BANNER_RETRIEVED, { mediaUrl });
  } catch (error) {
    ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
  }
};

// exports.createAccount = async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     await userService.createUser({ ...req.body, password: hashedPassword });
//     ResponseHandler.success(res, 201, messages.ACCOUNT_CREATED);
//   } catch (error) {
//     ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
//   }
// };

// exports.loginAccount = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await userService.findUserByEmail(email);
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return ResponseHandler.error(res, 401, messages.INVALID_CREDENTIALS);
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     ResponseHandler.success(res, 200, messages.LOGIN_SUCCESSFUL, { token });
//   } catch (error) {
//     ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
//   }
// };
