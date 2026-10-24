
const RoleController = require('./RoleController');

const setRoleRoute = (router) => {
  router.get('/roles', RoleController.getAll);
  router.get('/roles/:id', RoleController.getById);
  router.post('/roles', RoleController.create);
  router.put('/roles/:id', RoleController.update);
  router.delete('/roles/:id', RoleController.deleteOne);

  
  router.post('/roles/bulk-insert', RoleController.bulkInsert);
  router.put('/roles/bulk-update', RoleController.bulkUpdate);
  
};

module.exports = setRoleRoute;
