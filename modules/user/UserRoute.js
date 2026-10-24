
const UserController = require('./UserController');

const setUserRoute = (router) => {
  router.get('/users', UserController.getAll);
  router.get('/users/:id', UserController.getById);
  router.post('/users', UserController.create);
  router.put('/users/:id', UserController.update);
  router.delete('/users/:id', UserController.deleteOne);

  
  router.post('/users/bulk-insert', UserController.bulkInsert);
  router.put('/users/bulk-update', UserController.bulkUpdate);
  
};

module.exports = setUserRoute;
