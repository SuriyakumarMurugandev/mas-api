
const BaseModel = require('../../model/AppModel');
const response = require('../../Responses/Response');
const BusinessModel = require('./BusinessModel');

const Business = BaseModel(BusinessModel);

const BusinessService = {

  async getAll() {
    try {
      const data = await Business.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch business', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await Business.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch business', err.message);
    }
  },

  async create(data) {
    try {
      const result = await Business.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await Business.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await Business.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return Business.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return Business.bulkUpdate(data);
  },
  

};

module.exports = BusinessService;
