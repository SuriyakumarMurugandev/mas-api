
const BusinessTypeController = require('./BusinessTypeController');

const setBusinessTypeRoute = (router) => {
  router.get('/businesstypes', BusinessTypeController.getAll);
  router.get('/businesstypes/:id', BusinessTypeController.getById);
  router.post('/businesstypes', BusinessTypeController.create);
  router.put('/businesstypes/:id', BusinessTypeController.update);
  router.delete('/businesstypes/:id', BusinessTypeController.deleteOne);

  
  router.post('/businesstypes/bulk-insert', BusinessTypeController.bulkInsert);
  router.put('/businesstypes/bulk-update', BusinessTypeController.bulkUpdate);
  
};

module.exports = setBusinessTypeRoute;
