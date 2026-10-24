
const BusinessController = require('./BusinessController');

const setBusinessRoute = (router) => {
  router.get('/businesss', BusinessController.getAll);
  router.get('/businesss/:id', BusinessController.getById);
  router.post('/businesss', BusinessController.create);
  router.put('/businesss/:id', BusinessController.update);
  router.delete('/businesss/:id', BusinessController.deleteOne);

  
  router.post('/businesss/bulk-insert', BusinessController.bulkInsert);
  router.put('/businesss/bulk-update', BusinessController.bulkUpdate);
  
};

module.exports = setBusinessRoute;
