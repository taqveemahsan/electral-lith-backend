// src/models/Glossary.js
class Glossary {
    constructor({ id, term, definition, createdAt }) {
      this.id = id || null; // Unique identifier
      this.term = term; // Glossary term
      this.definition = definition; // Term definition
      this.createdAt = createdAt || new Date().toISOString(); // Timestamp
    }
  }
  
  module.exports = Glossary;
  