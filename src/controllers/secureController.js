// src/controllers/secureController.js

exports.getProtectedData =(req, res) => {
    res.json({ message: 'This is protected data', userId: req.userId });
  }
  