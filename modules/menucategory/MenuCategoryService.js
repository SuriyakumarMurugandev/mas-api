
const BaseModel = require('../../model/AppModel');
const response = require('../Responses/Response');
const MenuCategoryModel = require('./MenuCategoryModel');

const MenuCategory = BaseModel(MenuCategoryModel);

const MenuCategoryService = {

  async getAll() {
    try {
      const data = await MenuCategory.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch menucategory', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await MenuCategory.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch menucategory', err.message);
    }
  },

  async create(data) {
    try {
      const result = await MenuCategory.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await MenuCategory.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await MenuCategory.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return MenuCategory.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return MenuCategory.bulkUpdate(data);
  },
  

};

module.exports = MenuCategoryService;
