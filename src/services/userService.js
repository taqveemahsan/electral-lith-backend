// src/services/userService.js
const elasticsearchContext = require('../../context/elasticsearchContext');
const User = require('../models/user');
const Banner = require('../models/banner');
const contactUs = require('../models/contactUs')
const Job = require('../models/job');
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

  // // Method to get the current banner image
  // async getBannerImage(id) {
    
  //   const results = await elasticsearchContext.search(Banner, {
  //         match_all: {}
  //       }, { createdAt: { order: "desc" } }, 0, 20);
    
  //   if (results.hits.total.value === 0) {
  //     throw new Error('No banners found');
  //   }
  
  //   const latestBanner = results.hits.hits[0]._source; // Extract the latest banner
  //   return latestBanner.mediaUrl; // Return only the media URL
   
  // }

  // Method to get the current banner image
async getBannerImage() {
  try {
    const results = await elasticsearchContext.search(
      Banner,
      { match_all: {} },
      { createdAt: { order: "desc" } },
      0,
      1 
    );

    if (results.length > 0) {
      return results[0].mediaUrl;
    } else {
      throw new Error("Banner not found");
    }
  } catch (error) {
    return "Banner not found";
  }
}



  // Add a new contact us entry
  async addContactUs(data) {
    const contact = new contactUs(data);
    await elasticsearchContext.create(contact); // Add to Elasticsearch
    await elasticsearchContext.saveChanges(); // Save changes
    return contact;
  }

  // Get all contact us entries with pagination
  async getContactUsList({ page, limit }) {
    const from = (page - 1) * limit;
    const query = {
      from,
      size: limit,
    };

    const results = await elasticsearchContext.search(contactUs, {
          match_all: {}
        }, { createdAt: { order: "desc" } }, from, limit);
    return results; // Return formatted list
  }

  // Get a contact us entry by ID
  async getContactUsById(id) {
    const contact = await elasticsearchContext.findByIdByIndexName(contactUs, id);
    if (!contact) {
      throw new Error('Contact entry not found');
    }
    return contact;
  }

  // Add a new job
  async addJob(data) {
    const job = new Job(data);
    await elasticsearchContext.create(job); // Add to Elasticsearch
    await elasticsearchContext.saveChanges(); // Save changes
    return job;
  }

  // Get all jobs with pagination
  async getJobList({ page, limit }) {
    const from = (page - 1) * limit;
    const query = {
      from,
      size: limit,
    };

    const results = await elasticsearchContext.search(Job, {
      match_all: {}
    }, { createdAt: { order: "desc" } }, from, limit);
    return results; // Return formatted list
  }

  // Get job by ID
  async getJobById(id) {
    const job = await elasticsearchContext.findByIdByIndexName(Job, id);
    if (!job) {
      throw new Error('Job not found');
    }
    return job;
  }

}

module.exports = new UserService();
  // // Get paginated list of news
  // async getNewsList({ page, limit }) {
  //   const from = (page - 1) * limit; // Calculate the starting point for pagination
  //   const query = {
  //     from,
  //     size: limit,
  //   };

  //   const users = await elasticsearchContext.search(News, {
  //     match_all: {}
  //   }, { createdAt: { order: "desc" } }, from, limit);

  //   return users; //await elasticsearchContext.search(News, query);
  // }