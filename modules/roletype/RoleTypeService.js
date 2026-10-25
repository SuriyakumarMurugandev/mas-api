
const BaseModel = require('../../model/AppModel');
const response = require('../../Responses/Response');
const RoleTypeModel = require('./RoleTypeModel');

const RoleType = BaseModel(RoleTypeModel);

const RoleTypeService = {

  async getAll() {
    try {
      const data = await RoleType.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch roletype', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await RoleType.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch roletype', err.message);
    }
  },

  async create(data) {
    try {
      const result = await RoleType.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await RoleType.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await RoleType.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return RoleType.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return RoleType.bulkUpdate(data);
  },
  

};

module.exports = RoleTypeService;
