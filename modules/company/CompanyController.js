
const CompanyService = require('./CompanyService');

const getAll = async (req, res) => {
  const result = await CompanyService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await CompanyService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await CompanyService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await CompanyService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await CompanyService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await CompanyService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await CompanyService.bulkUpdate(req.body);
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
