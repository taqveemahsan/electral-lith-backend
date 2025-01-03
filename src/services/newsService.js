const News = require('../models/news');
const elasticsearchContext = require('../../context/elasticsearchContext');
const path = require('path');

class NewsService {
  /**
   * Adds a new news item to Elasticsearch.
   * @param {Object} data - News data.
   * @param {Object} file - Media file (image or video).
   * @returns {Object} - The created news item.
   */
  async addNews(data, file) {
    let mediaType = null;
    let mediaPath = null;

    if (file) {
      mediaType = file.mimetype.startsWith('image/') ? 'image' : 'video';
      mediaPath = path.join('uploads', file.filename); // Relative path for media
    }

    const news = new News({
      ...data,
      // mediaType,
      // mediaPath,
    });

    await elasticsearchContext.create(news);
    await elasticsearchContext.saveChanges();
    return news;
  }

  /**
   * Updates an existing news item in Elasticsearch.
   * @param {string} id - The ID of the news item to update.
   * @param {Object} updatedData - The updated data.
   * @returns {Object} - The updated news item.
   * @throws Will throw an error if the news item is not found.
   */
  async updateNews(id, updatedData) {
    const existingNews = await this.findNewsById(id);

    if (!existingNews) {
      throw new Error('News not found');
    }

    // Merge updated data with existing news
    const updatedNews = { ...existingNews, ...updatedData };

    // Update in Elasticsearch
    await elasticsearchContext.create(updatedNews);
    await elasticsearchContext.saveChanges();
    return updatedNews;
  }

  /**
   * Finds a news item by its ID.
   * @param {string} id - The ID of the news item to find.
   * @returns {Object|null} - The found news item or null if not found.
   */
  async findNewsById(id) {
    return await elasticsearchContext.findById(News, id);
  }

  // Get paginated list of news
  async getNewsList({ page, limit }) {
    const from = (page - 1) * limit; // Calculate the starting point for pagination
    const query = {
      from,
      size: limit,
    };

    const users = await elasticsearchContext.search(News, {
      match_all: {}
    }, { createdAt: { order: "desc" } }, from, limit);

    return users; //await elasticsearchContext.search(News, query);
  }

  // Find news by ID
  async findNewsById(id) {
    const news = await elasticsearchContext.findByIdByIndexName(News, id);
    return news;
  }

  // Delete news by ID
  async deleteNews(id) {
    await elasticsearchContext.delete('News', id);
  }
}

module.exports = new NewsService();
