
const BaseModel = require('../../model/AppModel');
const response = require('../Responses/Response');
const RoleMenuAccessModel = require('./RoleMenuAccessModel');

const RoleMenuAccess = BaseModel(RoleMenuAccessModel);

const RoleMenuAccessService = {

  async getAll() {
    try {
      const data = await RoleMenuAccess.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch rolemenuaccess', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await RoleMenuAccess.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch rolemenuaccess', err.message);
    }
  },

  async create(data) {
    try {
      const result = await RoleMenuAccess.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await RoleMenuAccess.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await RoleMenuAccess.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return RoleMenuAccess.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return RoleMenuAccess.bulkUpdate(data);
  },
  

};

module.exports = RoleMenuAccessService;
