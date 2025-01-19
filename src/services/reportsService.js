const Reports = require('../models/reports');
const elasticsearchContext = require('../../context/elasticsearchContext');

class ReportsService {
  // Add a new report

  async addReport(data, file) {
    let mediaType = null;
    let mediaPath = null;

    if (file) {
      mediaType = file.mimetype.startsWith('image/') ? 'image' : 'video';
      mediaPath = path.join('uploads', file.filename); // Relative path for media
    }

    const news = new Reports({
      ...data,
      // mediaType,
      // mediaPath,
    });

    await elasticsearchContext.create(news);
    await elasticsearchContext.saveChanges();
    return news;
  }

  // Get a paginated list of reports
  async getReportsList({ page, limit }) {
    const from = (page - 1) * limit;
    const query = {
      from,
      size: limit,
    };

    const results = await elasticsearchContext.search(
      Reports,
      { match_all: {} }, // Match all reports
      { createdAt: { order: "desc" } }, // Sort by `createdAt` descending
      from,
      limit
    );

    return results; // Return formatted list
  }

  // Get a single report by its ID
  async getReportById(id) {
    const report = await elasticsearchContext.findByIdByIndexName(Reports, id);
    if (!report) {
      throw new Error('Report not found');
    }
    return report;
  }

  // Update an existing report
  async updateReport(id, data) {
    const report = await this.getReportById(id); // Check if the report exists
    Object.assign(report, data); // Merge new data into the report object
    await elasticsearchContext.update(Reports, id ,report); // Update in Elasticsearch
    await elasticsearchContext.saveChanges(); // Save changes
    return report;
  }

  // Delete a report by its ID
  async deleteReport(id) {
    const report = await this.getReportById(id); // Check if the report exists
    await elasticsearchContext.delete(Reports, id); // Remove from Elasticsearch
    await elasticsearchContext.saveChanges(); // Save changes
    return true;
  }
}

module.exports = new ReportsService();
