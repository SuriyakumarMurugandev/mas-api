
const RoleTypeController = require('./RoleTypeController');

const setRoleTypeRoute = (router) => {
  router.get('/roletypes', RoleTypeController.getAll);
  router.get('/roletypes/:id', RoleTypeController.getById);
  router.post('/roletypes', RoleTypeController.create);
  router.put('/roletypes/:id', RoleTypeController.update);
  router.delete('/roletypes/:id', RoleTypeController.deleteOne);

  
  router.post('/roletypes/bulk-insert', RoleTypeController.bulkInsert);
  router.put('/roletypes/bulk-update', RoleTypeController.bulkUpdate);
  
};

module.exports = setRoleTypeRoute;
