// src/models/FAQ.js
class FAQ {
    constructor({ id, question, answer, createdAt }) {
      this.id = id || null; // Unique identifier
      this.question = question; // FAQ question
      this.answer = answer; // FAQ answer
      this.createdAt = createdAt || new Date().toISOString(); // Timestamp
    }
  }
  
  module.exports = FAQ;
  