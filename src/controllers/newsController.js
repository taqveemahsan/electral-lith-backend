const newsService = require('../services/newsService');
const ResponseHandler = require('../common/responseHandler');
const messages = require('../common/messageEnum');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/news/'));
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
}).single('media');

/**
 * Add a new news item.
 */
exports.addNews = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return ResponseHandler.error(res, 400, 'File upload error', err.message);
    }

    try {
      const { title, content, author, category } = req.body;

      // Validate required fields
      if (!title || !content || !author) {
        return ResponseHandler.error(res, 400, 'Missing required fields');
      }

      let mediaType = null;
      let mediaPath = null;

      // Handle media file if provided
      if (req.file) {
        mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
        mediaPath = path.join('/uploads/news/', req.file.filename); // Relative path for media
      }

      // Add the news
      await newsService.addNews({ title, content, author, category, mediaType, mediaPath });
      ResponseHandler.success(res, 201, messages.NEWS_ADDED);
    } catch (error) {
      ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
    }
  });
};

/**
 * Add a new news item.
 */
// exports.addNews = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return ResponseHandler.error(res, 400, 'File upload error', err.message);
//     }

//     try {
//       const { title, content, author, category } = req.body;

//       // Validate required fields
//       if (!title || !content || !author) {
//         return ResponseHandler.error(res, 400, 'Missing required fields');
//       }

//       // Handle media file if provided
//       if (req.file) {
//         mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
//         mediaPath = req.file ? path.join('/uploads/news/', req.file.filename) : null; // Relative path for media
//       }
//       // Add the news
//       await newsService.addNews({ title, content, author, category, mediaType, mediaPath});
//       ResponseHandler.success(res, 201, messages.NEWS_ADDED);
//     } catch (error) {
//       ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
//     }
//   });
// };

/**
 * Edit an existing news item.
 */
exports.editNews = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return ResponseHandler.error(res, 400, 'File upload error', err.message);
    }

    const { id } = req.params; // Get news ID from the URL
    const { title, content, author, category } = req.body; // Get updated data from the body

    try {
      // Find the existing news item
      const existingNews = await newsService.findNewsById(id);

      if (!existingNews) {
        return ResponseHandler.error(res, 404, 'News not found');
      }

      // Prepare updated data with fallback to existing values
      const updatedData = {
        title: title || existingNews.title,
        content: content || existingNews.content,
        author: author || existingNews.author,
        category: category || existingNews.category,
      };

      // Handle new media file if provided
      if (req.file) {
        const mediaUrl = path.join('/uploads/news/', req.file.filename);

        // Delete the old media file if it exists
        if (existingNews.mediaUrl) {
          const oldMediaPath = path.join(__dirname, '../../', existingNews.mediaUrl);
          if (fs.existsSync(oldMediaPath)) {
            fs.unlinkSync(oldMediaPath); // Delete the old file
          }
        }

        updatedData.mediaUrl = mediaUrl;
      }

      // Update the news item
      await newsService.updateNews(id, updatedData);

      ResponseHandler.success(res, 200, messages.NEWS_UPDATED);
    } catch (error) {
      ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
    }
  });
};

// src/controllers/newsController.js
exports.getNewsList = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination (default page 1, limit 10)
    const newsList = await newsService.getNewsList({ page, limit });

    ResponseHandler.success(res, 200, messages.SUCCESS, newsList);
  } catch (error) {
    ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
  }
};
 
// src/controllers/newsController.js
exports.getNewsById = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await newsService.findNewsById(id);

    if (!news) {
      return ResponseHandler.error(res, 404, 'News not found');
    }

    ResponseHandler.success(res, 200, messages.SUCCESS, news);
  } catch (error) {
    ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
  }
};


// src/controllers/newsController.js
exports.deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const existingNews = await newsService.findNewsById(id);

    if (!existingNews) {
      return ResponseHandler.error(res, 404, 'News not found');
    }

    // Optionally, delete the media file associated with the news
    if (existingNews.mediaUrl) {
      const mediaPath = path.join(__dirname, '../../', existingNews.mediaUrl);
      if (fs.existsSync(mediaPath)) {
        fs.unlinkSync(mediaPath); // Delete the media file
      }
    }

    // Proceed to delete the news
    await newsService.deleteNews(id);

    ResponseHandler.success(res, 200, messages.NEWS_DELETED);
  } catch (error) {
    ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
  }
};
