
const BaseModel = require('../../model/AppModel');
const response = require('../../Responses/Response');
const CompanyMenuModel = require('./CompanyMenuModel');

const CompanyMenu = BaseModel(CompanyMenuModel);

const CompanyMenuService = {

  async getAll() {
    try {
      const data = await CompanyMenu.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch companymenu', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await CompanyMenu.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch companymenu', err.message);
    }
  },

  async create(data) {
    try {
      const result = await CompanyMenu.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await CompanyMenu.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await CompanyMenu.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return CompanyMenu.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return CompanyMenu.bulkUpdate(data);
  },
  

};

module.exports = CompanyMenuService;
