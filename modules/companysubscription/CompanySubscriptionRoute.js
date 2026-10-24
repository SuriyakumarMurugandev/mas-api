
const CompanySubscriptionController = require('./CompanySubscriptionController');

const setCompanySubscriptionRoute = (router) => {
  router.get('/companysubscriptions', CompanySubscriptionController.getAll);
  router.get('/companysubscriptions/:id', CompanySubscriptionController.getById);
  router.post('/companysubscriptions', CompanySubscriptionController.create);
  router.put('/companysubscriptions/:id', CompanySubscriptionController.update);
  router.delete('/companysubscriptions/:id', CompanySubscriptionController.deleteOne);

  
  router.post('/companysubscriptions/bulk-insert', CompanySubscriptionController.bulkInsert);
  router.put('/companysubscriptions/bulk-update', CompanySubscriptionController.bulkUpdate);
  
};

module.exports = setCompanySubscriptionRoute;
