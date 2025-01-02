// src/models/banner.js

class Banner {
  constructor(data) {
    this.id = data.id || null;
    this.mediaUrl = data.mediaUrl || null; // URL of the banner image or video
  }
}

module.exports = Banner;
