
const BusinessTypeService = require('./BusinessTypeService');

const getAll = async (req, res) => {
  const result = await BusinessTypeService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await BusinessTypeService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await BusinessTypeService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await BusinessTypeService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await BusinessTypeService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await BusinessTypeService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await BusinessTypeService.bulkUpdate(req.body);
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
