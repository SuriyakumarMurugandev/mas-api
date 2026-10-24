
const MenuController = require('./MenuController');

const setMenuRoute = (router) => {
  router.get('/menus', MenuController.getAll);
  router.get('/menus/:id', MenuController.getById);
  router.post('/menus', MenuController.create);
  router.put('/menus/:id', MenuController.update);
  router.delete('/menus/:id', MenuController.deleteOne);

  
  router.post('/menus/bulk-insert', MenuController.bulkInsert);
  router.put('/menus/bulk-update', MenuController.bulkUpdate);
  
};

module.exports = setMenuRoute;
