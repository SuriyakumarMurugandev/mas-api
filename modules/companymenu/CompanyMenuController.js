
const CompanyMenuService = require('./CompanyMenuService');

const getAll = async (req, res) => {
  const result = await CompanyMenuService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await CompanyMenuService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await CompanyMenuService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await CompanyMenuService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await CompanyMenuService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await CompanyMenuService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await CompanyMenuService.bulkUpdate(req.body);
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
