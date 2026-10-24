
const BaseModel = require('../../model/AppModel');
const response = require('../Responses/Response');
const UserModel = require('./UserModel');

const User = BaseModel(UserModel);

const UserService = {

  async getAll() {
    try {
      const data = await User.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch user', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await User.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch user', err.message);
    }
  },

  async create(data) {
    try {
      const result = await User.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await User.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await User.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return User.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return User.bulkUpdate(data);
  },
  

};

module.exports = UserService;
