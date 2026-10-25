
const BaseModel = require('../../model/AppModel');
const response = require('../../../Responses/Response');
const BranchModel = require('./BranchModel');

const Branch = BaseModel(BranchModel);

const BranchService = {

  async getAll() {
    try {
      const data = await Branch.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch branch', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await Branch.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch branch', err.message);
    }
  },

  async create(data) {
    try {
      const result = await Branch.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await Branch.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await Branch.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return Branch.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return Branch.bulkUpdate(data);
  },
  

};

module.exports = BranchService;
