
const CompanySubscriptionService = require('./CompanySubscriptionService');

const getAll = async (req, res) => {
  const result = await CompanySubscriptionService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await CompanySubscriptionService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await CompanySubscriptionService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await CompanySubscriptionService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await CompanySubscriptionService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await CompanySubscriptionService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await CompanySubscriptionService.bulkUpdate(req.body);
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
