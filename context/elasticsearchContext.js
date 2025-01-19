// context/elasticsearchContext.js
const client = require('../config/elasticsearch');
const { v4: uuidv4 } = require('uuid');
class ElasticsearchContext {
  constructor() {
    this.bulkOperations = [];
  }

  async getIndexName(entity) {
    const modelName = entity.constructor.name; // Automatically get model name
    return `${process.env.ELASTICSEARCH_ALIES}_${modelName.toLowerCase()}`;
  }

  async create(entity) {
    const index = await this.getIndexName(entity);
    entity.id = uuidv4();//auto generated unique Id
    this.bulkOperations.push({ create: { _index: index, _id: entity.id } });
    this.bulkOperations.push(entity);
  }

  async saveChanges() {
    if (this.bulkOperations.length === 0) return;

    const { body: response } = await client.bulk({
      refresh: true,
      body: this.bulkOperations,
    });

    this.bulkOperations = [];
    return response;
  }

  async findById(entityClass, id) {
    const index = await this.getIndexName({ constructor: { name: entityClass.name } });
    const { body } = await client.get({ index, id });
    return body._source ? new entityClass(body._source) : null;
  }

  async update(entityClass, id, entity) {
    const index = await this.getIndexName({ constructor: { name: entityClass.name } });
    // Push the update action and document to the bulk operations
    this.bulkOperations.push({ update: { _index: index, _id: id } });
    this.bulkOperations.push({ doc: entity });
  }

  async findByIdByIndexName(entityClass, id) {
    try {
      const index = await this.getIndexName({ constructor: { name: entityClass.name } });

      const body = await client.search({
        index: index,
        body: {
          query: {
            term: { id },
          },
        },
      });
      if (body.hits.total.value === 0) {
        return null;
      }
      const user = body.hits.hits[0]._source;
      return user;
    } catch (error) {
      if (error.meta && error.meta.statusCode === 404) {
        return null;
      }
      throw error;
    }
  }

  // async search(entityClass, query) {
  //   const index = await this.getIndexName({ constructor: { name: entityClass.name } });
  //   const { body } = await client.search({
  //     index,
  //     body: { query }
  //   });
  //   return body.hits.hits.map(hit => new entityClass(hit._source));
  // }

  async search(entityClass, query, sort, from = 0, pageSize = 15) {
    if (from == null || from === '') from = 0;
    if (pageSize == null || pageSize === '') pageSize = 15;

    try {
      const index = await this.getIndexName({ constructor: { name: entityClass.name } });
      const body = await client.search({
        index: index,
        query: query,
        from: from,
        size: pageSize,
        sort: sort
      });

      if (!body || !body.hits || !body.hits.hits || body.hits.hits.length === 0) {
        return null;
      }
      return body.hits.hits.map(hit => new entityClass(hit._source));

    } catch (error) {
      // Handle errors and log them
      console.error("Error during search:", error);
      return null;
    }
  }

  async delete(entityClass, id) {
    const index = await this.getIndexName({ constructor: { name: entityClass.name } });
    this.bulkOperations.push({ delete: { _index: index, _id: id } });
  }
}

module.exports = new ElasticsearchContext();
