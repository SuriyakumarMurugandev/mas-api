
const UserService = require('./UserService');

const getAll = async (req, res) => {
  const result = await UserService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await UserService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await UserService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await UserService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await UserService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await UserService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await UserService.bulkUpdate(req.body);
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
