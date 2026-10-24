
const SubscriptionPlanService = require('./SubscriptionPlanService');

const getAll = async (req, res) => {
  const result = await SubscriptionPlanService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await SubscriptionPlanService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await SubscriptionPlanService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await SubscriptionPlanService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await SubscriptionPlanService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await SubscriptionPlanService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await SubscriptionPlanService.bulkUpdate(req.body);
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
