// src/services/userService.js
const elasticsearchContext = require('../../context/elasticsearchContext');
const User = require('../models/user');
const Banner = require('../models/banner');
const path = require('path');

class UserService {
  async createUser(data) {
    const user = new User(data); // Create User instance
    await elasticsearchContext.create(user);
    await elasticsearchContext.saveChanges();
  }

  async findUserByEmail(email) {
    const users = await elasticsearchContext.search(User, {
      match: { email }
    });
    return users.length ? new User(users[0]) : null; // Return the first match as User instance
  }

  // Method to update the banner image
  async updateBannerImage(id, file) {
    const bannerData = await elasticsearchContext.findByIdByIndexName(Banner, id);
    // if (!bannerData) {
    //   throw new Error('Banner not found');
    // }

    let mediaUrl = null;
    if (file) {
      // Save the media path to the image file
      mediaUrl = path.join('/uploads/banners/', file.filename);
    }

    // Prepare the updated banner data
    const updatedBannerData = {
      ...bannerData,
      mediaUrl,
    };

    // Create a new Banner instance with updated data
    const updatedBanner = new Banner(updatedBannerData);

    // Update the banner in Elasticsearch
    await elasticsearchContext.create(updatedBanner);
    await elasticsearchContext.saveChanges();

    return updatedBanner;
  }

  // Method to get the current banner image
  async getBannerImage(id) {
    const bannerData = await elasticsearchContext.findByIdByIndexName(Banner, id);
    if (!bannerData) {
      throw new Error('Banner not found');
    }

    return bannerData.mediaUrl;
  }

}

module.exports = new UserService();
