
const BranchService = require('./BranchService');

const getAll = async (req, res) => {
  const result = await BranchService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await BranchService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await BranchService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await BranchService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await BranchService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await BranchService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await BranchService.bulkUpdate(req.body);
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
