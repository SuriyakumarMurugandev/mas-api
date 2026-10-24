
const BusinessService = require('./BusinessService');

const getAll = async (req, res) => {
  const result = await BusinessService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await BusinessService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await BusinessService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await BusinessService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await BusinessService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await BusinessService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await BusinessService.bulkUpdate(req.body);
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
