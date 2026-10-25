
const BaseModel = require('../../model/AppModel');
const response = require('../../Responses/Response');
const SubscriptionPlanModel = require('./SubscriptionPlanModel');

const SubscriptionPlan = BaseModel(SubscriptionPlanModel);

const SubscriptionPlanService = {

  async getAll() {
    try {
      const data = await SubscriptionPlan.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch subscriptionplan', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await SubscriptionPlan.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch subscriptionplan', err.message);
    }
  },

  async create(data) {
    try {
      const result = await SubscriptionPlan.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await SubscriptionPlan.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await SubscriptionPlan.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return SubscriptionPlan.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return SubscriptionPlan.bulkUpdate(data);
  },
  

};

module.exports = SubscriptionPlanService;
