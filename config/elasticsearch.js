// config/elasticsearch.js
const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const client = new Client({
  node: process.env.ELASTICSEARCH_URL,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Disable SSL certificate validation
  },
});

module.exports = client; // Export the client instance