// src/models/job.js
class Job {
    constructor({ id, title, description, location, type, category, postedBy, createdAt }) {
      this.id = id || null; // Unique identifier
      this.title = title; // Job title
      this.description = description; // Job description
      this.location = location; // Job location
      this.type = type; // Job type (e.g., Full-time, Part-time)
      this.category = category; // Job category
      this.postedBy = postedBy; // Name of the admin who posted the job
      this.createdAt = createdAt || new Date().toISOString(); // Timestamp
    }
  }
  
  module.exports = Job;
  