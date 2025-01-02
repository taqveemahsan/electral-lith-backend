class News {
    constructor({ id, title, content, author, createdAt, mediaType, mediaPath }) {
      this.id = id;                // unique identifier
      this.title = title;          // string
      this.content = content;      // string
      this.author = author;        // string (author name)
      this.createdAt = createdAt || new Date(); // date of creation
      this.mediaType = mediaType;  // string (e.g., "image" or "video", nullable)
      this.mediaPath = mediaPath;  // string (file path, nullable)
    }
  }
  
  module.exports = News;
  