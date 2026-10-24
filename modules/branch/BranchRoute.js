
const BranchController = require('./BranchController');

const setBranchRoute = (router) => {
  router.get('/branchs', BranchController.getAll);
  router.get('/branchs/:id', BranchController.getById);
  router.post('/branchs', BranchController.create);
  router.put('/branchs/:id', BranchController.update);
  router.delete('/branchs/:id', BranchController.deleteOne);

  
  router.post('/branchs/bulk-insert', BranchController.bulkInsert);
  router.put('/branchs/bulk-update', BranchController.bulkUpdate);
  
};

module.exports = setBranchRoute;
