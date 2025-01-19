// src/services/userService.js
const elasticsearchContext = require('../../context/elasticsearchContext');
const User = require('../models/user');
const Banner = require('../models/banner');
const SecondBanner = require('../models/banner');
const ThirdBanner = require('../models/banner');
const contactUs = require('../models/contactUs');
const Job = require('../models/job');
const path = require('path');
const FAQ = require('../models/FAQ');
const Glossary = require('../models/glossary');

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

  // Method to update the banner image
  async updateSecondBannerImage(id, file) {
    const bannerData = await elasticsearchContext.findByIdByIndexName(SecondBanner, id);
    // if (!bannerData) {
    //   throw new Error('Banner not found');
    // }

    let mediaUrl = null;
    if (file) {
      // Save the media path to the image file
      mediaUrl = path.join('/uploads/SecondBanners/', file.filename);
    }

    // Prepare the updated banner data
    const updatedBannerData = {
      ...bannerData,
      mediaUrl,
    };

    // Create a new Banner instance with updated data
    const updatedBanner = new SecondBanner(updatedBannerData);

    // Update the banner in Elasticsearch
    await elasticsearchContext.create(updatedBanner);
    await elasticsearchContext.saveChanges();

    return updatedBanner;
  }

  // Method to get the current banner image
  async getSecondBannerBannerImage() {
    try {
      const results = await elasticsearchContext.search(
        SecondBanner,
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

  // Method to update the banner image
  async updateThirdBannerImage(id, file) {
    const bannerData = await elasticsearchContext.findByIdByIndexName(ThirdBanner, id);
    // if (!bannerData) {
    //   throw new Error('Banner not found');
    // }

    let mediaUrl = null;
    if (file) {
      // Save the media path to the image file
      mediaUrl = path.join('/uploads/thirdBanners/', file.filename);
    }

    // Prepare the updated banner data
    const updatedBannerData = {
      ...bannerData,
      mediaUrl,
    };

    // Create a new Banner instance with updated data
    const updatedBanner = new ThirdBanner(updatedBannerData);

    // Update the banner in Elasticsearch
    await elasticsearchContext.create(updatedBanner);
    await elasticsearchContext.saveChanges();

    return updatedBanner;
  }

  // Method to get the current banner image
  async getThirdBannerImage() {
    try {
      const results = await elasticsearchContext.search(
        ThirdBanner,
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

  async addFAQ(data) {
    const faq = new FAQ(data);
    await elasticsearchContext.create(faq); // Add to Elasticsearch
    await elasticsearchContext.saveChanges(); // Save changes
    return faq;
  }

  async getFAQList({ page, limit }) {
    const from = (page - 1) * limit;
    const query = {
      from,
      size: limit,
    };

    const results = await elasticsearchContext.search(
      FAQ,
      { match_all: {} },
      { createdAt: { order: 'desc' } },
      from,
      limit
    );
    return results;
  }

  async getFAQById(id) {
    const faq = await elasticsearchContext.findByIdByIndexName(FAQ, id);
    if (!faq) {
      throw new Error('FAQ not found');
    }
    return faq;
  }

  async updateFAQ(id, data) {
    const faq = await this.getFAQById(id);
    if (!faq) {
      throw new Error('FAQ not found');
    }

    // Update properties
    faq.question = data.question || faq.question;
    faq.answer = data.answer || faq.answer;

    await elasticsearchContext.update(FAQ, id, faq);
    await elasticsearchContext.saveChanges();
    return faq;
  }

  async deleteFAQ(id) {
    const faq = await this.getFAQById(id);
    if (!faq) {
      throw new Error('FAQ not found');
    }

    await elasticsearchContext.delete(FAQ, id);
    await elasticsearchContext.saveChanges();
    return { message: 'FAQ deleted successfully' };
  }

  async addGlossaryTerm(data) {
    const glossary = new Glossary(data);
    await elasticsearchContext.create(glossary); // Add to Elasticsearch
    await elasticsearchContext.saveChanges(); // Save changes
    return glossary;
  }

  async getGlossaryList({ page, limit }) {
    const from = (page - 1) * limit;
    const query = {
      from,
      size: limit,
    };

    const results = await elasticsearchContext.search(
      Glossary,
      { match_all: {} },
      { createdAt: { order: 'desc' } },
      from,
      limit
    );
    return results;
  }

  async getGlossaryById(id) {
    const glossary = await elasticsearchContext.findByIdByIndexName(Glossary, id);
    if (!glossary) {
      throw new Error('Glossary term not found');
    }
    return glossary;
  }

  async updateGlossaryTerm(id, data) {
    const glossary = await this.getGlossaryById(id);
    if (!glossary) {
      throw new Error('Glossary term not found');
    }

    // Update properties
    glossary.term = data.term || glossary.term;
    glossary.definition = data.definition || glossary.definition;

    await elasticsearchContext.update(Glossary, id, glossary);
    await elasticsearchContext.saveChanges();
    return glossary;
  }

  async deleteGlossaryTerm(id) {
    const glossary = await this.getGlossaryById(id);
    if (!glossary) {
      throw new Error('Glossary term not found');
    }

    await elasticsearchContext.delete(Glossary, id);
    await elasticsearchContext.saveChanges();
    return { message: 'Glossary term deleted successfully' };
  }

}

module.exports = new UserService();