
const BaseModel = require('../../model/AppModel');
const response = require('../Responses/Response');
const CompanyModel = require('./CompanyModel');

const Company = BaseModel(CompanyModel);

const CompanyService = {

  async getAll() {
    try {
      const data = await Company.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch company', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await Company.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch company', err.message);
    }
  },

  async create(data) {
    try {
      const result = await Company.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await Company.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await Company.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return Company.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return Company.bulkUpdate(data);
  },
  

};

module.exports = CompanyService;
