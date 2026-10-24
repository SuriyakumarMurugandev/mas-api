
const CompanyMenuController = require('./CompanyMenuController');

const setCompanyMenuRoute = (router) => {
  router.get('/companymenus', CompanyMenuController.getAll);
  router.get('/companymenus/:id', CompanyMenuController.getById);
  router.post('/companymenus', CompanyMenuController.create);
  router.put('/companymenus/:id', CompanyMenuController.update);
  router.delete('/companymenus/:id', CompanyMenuController.deleteOne);

  
  router.post('/companymenus/bulk-insert', CompanyMenuController.bulkInsert);
  router.put('/companymenus/bulk-update', CompanyMenuController.bulkUpdate);
  
};

module.exports = setCompanyMenuRoute;
