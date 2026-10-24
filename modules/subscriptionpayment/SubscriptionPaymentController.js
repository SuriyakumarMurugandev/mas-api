
const SubscriptionPaymentService = require('./SubscriptionPaymentService');

const getAll = async (req, res) => {
  const result = await SubscriptionPaymentService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await SubscriptionPaymentService.getById(req.params.id);
  res.json(result);
};

const create = async (req, res) => {
  const result = await SubscriptionPaymentService.create(req.body);
  res.json(result);
};

const update = async (req, res) => {
  const result = await SubscriptionPaymentService.update(req.params.id, req.body);
  res.json(result);
};

const deleteOne = async (req, res) => {
  const result = await SubscriptionPaymentService.delete(req.params.id);
  res.json(result);
};


const bulkInsert = async (req, res) => {
  const result = await SubscriptionPaymentService.bulkInsert(req.body);
  res.json(result);
};

const bulkUpdate = async (req, res) => {
  const result = await SubscriptionPaymentService.bulkUpdate(req.body);
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
