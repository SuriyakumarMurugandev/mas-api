
const CompanyController = require('./CompanyController');

const setCompanyRoute = (router) => {
  router.get('/companys', CompanyController.getAll);
  router.get('/companys/:id', CompanyController.getById);
  router.post('/companys', CompanyController.create);
  router.put('/companys/:id', CompanyController.update);
  router.delete('/companys/:id', CompanyController.deleteOne);

  
  router.post('/companys/bulk-insert', CompanyController.bulkInsert);
  router.put('/companys/bulk-update', CompanyController.bulkUpdate);
  
};

module.exports = setCompanyRoute;
