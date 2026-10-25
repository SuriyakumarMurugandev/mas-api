
const BaseModel = require('../../model/AppModel');
const response = require('../../Responses/Response');
const MenuModel = require('./MenuModel');

const Menu = BaseModel(MenuModel);

const MenuService = {

  async getAll() {
    try {
      const data = await Menu.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch menu', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await Menu.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch menu', err.message);
    }
  },

  async create(data) {
    try {
      const result = await Menu.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await Menu.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await Menu.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return Menu.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return Menu.bulkUpdate(data);
  },
  

};

module.exports = MenuService;
