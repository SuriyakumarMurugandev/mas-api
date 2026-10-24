
const BaseModel = require('../../model/AppModel');
const response = require('../Responses/Response');
const UserAccessModel = require('./UserAccessModel');

const UserAccess = BaseModel(UserAccessModel);

const UserAccessService = {

  async getAll() {
    try {
      const data = await UserAccess.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch useraccess', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await UserAccess.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch useraccess', err.message);
    }
  },

  async create(data) {
    try {
      const result = await UserAccess.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await UserAccess.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await UserAccess.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return UserAccess.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return UserAccess.bulkUpdate(data);
  },
  

};

module.exports = UserAccessService;
