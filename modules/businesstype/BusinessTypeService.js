
const BaseModel = require('../../model/AppModel');
const response = require('../../Responses/Response');
const BusinessTypeModel = require('./BusinessTypeModel');

const BusinessType = BaseModel(BusinessTypeModel);

const BusinessTypeService = {

  async getAll() {
    try {
      const data = await BusinessType.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch businesstype', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await BusinessType.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch businesstype', err.message);
    }
  },

  async create(data) {
    try {
      const result = await BusinessType.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await BusinessType.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await BusinessType.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return BusinessType.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return BusinessType.bulkUpdate(data);
  },
  

};

module.exports = BusinessTypeService;
