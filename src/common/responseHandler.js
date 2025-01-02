// src/common/responseHandler.js

class ResponseHandler {
    static success(res, statusCode, message, data = {}) {
      return res.status(statusCode).json({
        success: true,
        message,
        data,
      });
    }
  
    static error(res, statusCode, message, errorDetails = {}) {
      return res.status(statusCode).json({
        success: false,
        message,
        error: errorDetails,
      });
    }
  }
  
  module.exports = ResponseHandler;
  