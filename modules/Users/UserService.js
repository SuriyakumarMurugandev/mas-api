
const BaseModel = require('../../model/AppModel');
const response = require('../../Responses/Response.js');
const UserConfig = require('./UserModel'); // ✅ import config

const User = BaseModel(UserConfig);

const UserService = {

  // ✅ GET ALL
  async getAll() {
    try {
      const data = await User.findAll(userModel);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch users', err.message);
    }
  },

  // ✅ GET BY ID
  async getById(id) {
    try {
      const data = await User.find(userModel, id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch user', err.message);
    }
  },

  // ✅ CREATE
  async create(data) {
    try {
      const result = await User.create(userModel, data);
      return response.success(result, 'User created');
    } catch (err) {
      return response.error('Failed to create user', err.message);
    }
  },

  // ✅ UPDATE
  async update(id, data) {
    try {
      const result = await User.update(userModel, id, data);
      return response.success(result, 'User updated');
    } catch (err) {
      return response.error('Failed to update user', err.message);
    }
  },

  // ✅ DELETE
  async delete(id) {
    try {
      const result = await User.delete(userModel, id);
      return response.success(result, 'User deleted');
    } catch (err) {
      return response.error('Failed to delete user', err.message);
    }
  },

  // ✅ BULK INSERT
  async bulkInsert(dataArray) {
    try {
      const result = await User.bulkInsert(userModel, dataArray);
      return response.success(result, 'Bulk insert success');
    } catch (err) {
      return response.error('Bulk insert failed', err.message);
    }
  },

  // ✅ BULK UPDATE
  async bulkUpdate(dataArray) {
    try {
      const result = await User.bulkUpdate(userModel, dataArray);
      return response.success(result, 'Bulk update success');
    } catch (err) {
      return response.error('Bulk update failed', err.message);
    }
  },

  // ✅ RAW QUERY
  async rawQuery($sql) {
    try {
      const data = await User.raw($sql);
      return response.success(data);
    } catch (err) {
      return response.error('Raw query failed', err.message);
    }
  },

  // ✅ PARAM QUERY
  async customQuery() {
    try {
      const data = await User.query(
        `SELECT * FROM users WHERE status = ?`,
        ['active']
      );
      return response.success(data);
    } catch (err) {
      return response.error('Custom query failed', err.message);
    }
  }

};

module.exports = UserService;