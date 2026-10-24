
const BaseModel = require('../../model/AppModel');
const response = require('../Responses/Response');
const SubscriptionPaymentModel = require('./SubscriptionPaymentModel');

const SubscriptionPayment = BaseModel(SubscriptionPaymentModel);

const SubscriptionPaymentService = {

  async getAll() {
    try {
      const data = await SubscriptionPayment.findAll();
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch subscriptionpayment', err.message);
    }
  },

  async getById(id) {
    try {
      const data = await SubscriptionPayment.find(id);
      return response.success(data);
    } catch (err) {
      return response.error('Failed to fetch subscriptionpayment', err.message);
    }
  },

  async create(data) {
    try {
      const result = await SubscriptionPayment.create(data);
      return response.success(result);
    } catch (err) {
      return response.error('Create failed', err.message);
    }
  },

  async update(id, data) {
    try {
      const result = await SubscriptionPayment.update(id, data);
      return response.success(result);
    } catch (err) {
      return response.error('Update failed', err.message);
    }
  },

  async delete(id) {
    try {
      const result = await SubscriptionPayment.delete(id);
      return response.success(result);
    } catch (err) {
      return response.error('Delete failed', err.message);
    }
  },

  
  async bulkInsert(data) {
    return SubscriptionPayment.bulkInsert(data);
  },

  async bulkUpdate(data) {
    return SubscriptionPayment.bulkUpdate(data);
  },
  

};

module.exports = SubscriptionPaymentService;
