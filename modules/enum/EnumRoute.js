
const EnumController = require('./EnumController');

const setEnumRoute = (router) => {
  router.get('/enums', EnumController.getAll);
  router.get('/enums/:id', EnumController.getById);
  router.post('/enums', EnumController.create);
  router.put('/enums/:id', EnumController.update);
  router.delete('/enums/:id', EnumController.deleteOne);

  
  router.post('/enums/bulk-insert', EnumController.bulkInsert);
  router.put('/enums/bulk-update', EnumController.bulkUpdate);
  
};

module.exports = setEnumRoute;
