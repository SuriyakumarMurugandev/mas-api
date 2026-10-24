
const RoleMenuAccessController = require('./RoleMenuAccessController');

const setRoleMenuAccessRoute = (router) => {
  router.get('/rolemenuaccesss', RoleMenuAccessController.getAll);
  router.get('/rolemenuaccesss/:id', RoleMenuAccessController.getById);
  router.post('/rolemenuaccesss', RoleMenuAccessController.create);
  router.put('/rolemenuaccesss/:id', RoleMenuAccessController.update);
  router.delete('/rolemenuaccesss/:id', RoleMenuAccessController.deleteOne);

  
  router.post('/rolemenuaccesss/bulk-insert', RoleMenuAccessController.bulkInsert);
  router.put('/rolemenuaccesss/bulk-update', RoleMenuAccessController.bulkUpdate);
  
};

module.exports = setRoleMenuAccessRoute;
