
const BaseModel = require('../../model/AppModel');
const response = require('../../Responses/Response');
const RoleModel = require('./RoleModel');

const Role = BaseModel(RoleModel);

const RoleService = {

  async getAll() {
    try {
      const data = await Role.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch role', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await Role.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch role', err.message);
    }
  },

  async create(data) {
    try {
      const result = await Role.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await Role.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await Role.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return Role.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return Role.bulkUpdate(data);
  },
  

};

module.exports = RoleService;
