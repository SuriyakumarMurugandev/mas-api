
const BaseModel = require('../../model/AppModel');
const response = require('../../Responses/Response');
const EnumModel = require('./EnumModel');

const Enum = BaseModel(EnumModel);

const EnumService = {

  async getAll() {
    try {
      const data = await Enum.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch enum', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await Enum.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch enum', err.message);
    }
  },

  async create(data) {
    try {
      const result = await Enum.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await Enum.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await Enum.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return Enum.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return Enum.bulkUpdate(data);
  },
  

};

module.exports = EnumService;
