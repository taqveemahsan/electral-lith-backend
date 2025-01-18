// src/models/banner.js

class Banner {
  constructor(data) {
    this.id = data.id || null;
    this.mediaUrl = data.mediaUrl || null; // URL of the banner image or video
    this.createdAt = data.createdAt || new Date().toISOString();
  }
}

module.exports = Banner;

class SecondBanner {
  constructor(data) {
    this.id = data.id || null;
    this.mediaUrl = data.mediaUrl || null; // URL of the banner image or video
    this.createdAt = data.createdAt || new Date().toISOString();
  }
}

module.exports = SecondBanner;

class ThirdBanner {
  constructor(data) {
    this.id = data.id || null;
    this.mediaUrl = data.mediaUrl || null; // URL of the banner image or video
    this.createdAt = data.createdAt || new Date().toISOString();
  }
}

module.exports = ThirdBanner;
