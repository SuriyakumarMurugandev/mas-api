
const MenuCategoryService = require('./MenuCategoryService');

const getAll = async (req, res) => {
  const result = await MenuCategoryService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await MenuCategoryService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await MenuCategoryService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await MenuCategoryService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await MenuCategoryService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await MenuCategoryService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await MenuCategoryService.bulkUpdate(req.body);
  res.json(result);
};


module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  bulkInsert, bulkUpdate
};
