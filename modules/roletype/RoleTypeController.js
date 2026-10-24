
const RoleTypeService = require('./RoleTypeService');

const getAll = async (req, res) => {
  const result = await RoleTypeService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await RoleTypeService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await RoleTypeService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await RoleTypeService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await RoleTypeService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await RoleTypeService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await RoleTypeService.bulkUpdate(req.body);
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
