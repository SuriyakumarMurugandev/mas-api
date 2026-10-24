
const MenuService = require('./MenuService');

const getAll = async (req, res) => {
  const result = await MenuService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await MenuService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await MenuService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await MenuService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await MenuService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await MenuService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await MenuService.bulkUpdate(req.body);
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
