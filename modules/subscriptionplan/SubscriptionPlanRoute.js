
const SubscriptionPlanController = require('./SubscriptionPlanController');

const setSubscriptionPlanRoute = (router) => {
  router.get('/subscriptionplans', SubscriptionPlanController.getAll);
  router.get('/subscriptionplans/:id', SubscriptionPlanController.getById);
  router.post('/subscriptionplans', SubscriptionPlanController.create);
  router.put('/subscriptionplans/:id', SubscriptionPlanController.update);
  router.delete('/subscriptionplans/:id', SubscriptionPlanController.deleteOne);

  
  router.post('/subscriptionplans/bulk-insert', SubscriptionPlanController.bulkInsert);
  router.put('/subscriptionplans/bulk-update', SubscriptionPlanController.bulkUpdate);
  
};

module.exports = setSubscriptionPlanRoute;
