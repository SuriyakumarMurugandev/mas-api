
const UserAccessController = require('./UserAccessController');

const setUserAccessRoute = (router) => {
  router.get('/useraccesss', UserAccessController.getAll);
  router.get('/useraccesss/:id', UserAccessController.getById);
  router.post('/useraccesss', UserAccessController.create);
  router.put('/useraccesss/:id', UserAccessController.update);
  router.delete('/useraccesss/:id', UserAccessController.deleteOne);

  
  router.post('/useraccesss/bulk-insert', UserAccessController.bulkInsert);
  router.put('/useraccesss/bulk-update', UserAccessController.bulkUpdate);
  
};

module.exports = setUserAccessRoute;
