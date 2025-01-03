// src/models/contactUs.js
class ContactUs {
    constructor({ id, name, email, message, createdAt }) {
      this.id = id || null; // Unique identifier
      this.name = name; // User's name
      this.email = email; // User's email
      this.message = message; // User's message
      this.createdAt = createdAt || new Date().toISOString(); // Timestamp
    }
  }
  
  module.exports = ContactUs;