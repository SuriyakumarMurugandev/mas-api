
const BaseModel = require('../../model/AppModel');
const response = require('../../Responses/Response');
const CompanySubscriptionModel = require('./CompanySubscriptionModel');

const CompanySubscription = BaseModel(CompanySubscriptionModel);

const CompanySubscriptionService = {

  async getAll() {
    try {
      const data = await CompanySubscription.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch companysubscription', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await CompanySubscription.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch companysubscription', err.message);
    }
  },

  async create(data) {
    try {
      const result = await CompanySubscription.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await CompanySubscription.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await CompanySubscription.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return CompanySubscription.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return CompanySubscription.bulkUpdate(data);
  },
  

};

module.exports = CompanySubscriptionService;
