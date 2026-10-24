
const RoleMenuAccessService = require('./RoleMenuAccessService');

const getAll = async (req, res) => {
  const result = await RoleMenuAccessService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await RoleMenuAccessService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await RoleMenuAccessService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await RoleMenuAccessService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await RoleMenuAccessService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await RoleMenuAccessService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await RoleMenuAccessService.bulkUpdate(req.body);
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
