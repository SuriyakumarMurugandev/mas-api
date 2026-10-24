
const EnumService = require('./EnumService');

const getAll = async (req, res) => {
  const result = await EnumService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await EnumService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await EnumService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await EnumService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await EnumService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await EnumService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await EnumService.bulkUpdate(req.body);
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
