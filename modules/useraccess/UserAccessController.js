
const UserAccessService = require('./UserAccessService');

const getAll = async (req, res) => {
  const result = await UserAccessService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await UserAccessService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await UserAccessService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await UserAccessService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await UserAccessService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await UserAccessService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await UserAccessService.bulkUpdate(req.body);
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
