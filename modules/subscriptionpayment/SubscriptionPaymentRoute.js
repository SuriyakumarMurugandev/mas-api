
const SubscriptionPaymentController = require('./SubscriptionPaymentController');

const setSubscriptionPaymentRoute = (router) => {
  router.get('/subscriptionpayments', SubscriptionPaymentController.getAll);
  router.get('/subscriptionpayments/:id', SubscriptionPaymentController.getById);
  router.post('/subscriptionpayments', SubscriptionPaymentController.create);
  router.put('/subscriptionpayments/:id', SubscriptionPaymentController.update);
  router.delete('/subscriptionpayments/:id', SubscriptionPaymentController.deleteOne);

  
  router.post('/subscriptionpayments/bulk-insert', SubscriptionPaymentController.bulkInsert);
  router.put('/subscriptionpayments/bulk-update', SubscriptionPaymentController.bulkUpdate);
  
};

module.exports = setSubscriptionPaymentRoute;
