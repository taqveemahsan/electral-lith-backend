class Reports {
    constructor({ id, title, description, downloadLink, mediaType, createdAt }) {
      this.id = id || null; // Unique identifier
      this.title = title; // Report title
      this.description = description; // Description of the report
      this.downloadLink = downloadLink; // Link to download the report
      this.mediaType = mediaType;  // string (e.g., "image" or "video", nullable)
      this.createdAt = createdAt || new Date().toISOString(); // Timestamp
    }
  }
  
  module.exports = Reports;
  