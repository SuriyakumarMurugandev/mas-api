
const MenuCategoryController = require('./MenuCategoryController');

const setMenuCategoryRoute = (router) => {
  router.get('/menucategorys', MenuCategoryController.getAll);
  router.get('/menucategorys/:id', MenuCategoryController.getById);
  router.post('/menucategorys', MenuCategoryController.create);
  router.put('/menucategorys/:id', MenuCategoryController.update);
  router.delete('/menucategorys/:id', MenuCategoryController.deleteOne);

  
  router.post('/menucategorys/bulk-insert', MenuCategoryController.bulkInsert);
  router.put('/menucategorys/bulk-update', MenuCategoryController.bulkUpdate);
  
};

module.exports = setMenuCategoryRoute;
