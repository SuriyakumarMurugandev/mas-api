
const SubscriptionPlanModel = {
  table: 'subscription_plans',

  columns: {
  "id": "number",
  "plan_code": "string",
  "plan_name": "string",
  "description": "string",
  "price": "number",
  "billing_cycle": "string",
  "max_users": "number",
  "max_branches": "number",
  "active": "number",
  "created": "date",
  "modified": "date",
  "created_by": "number",
  "modified_by": "number",
  "deleted": "number"
},

  sort: {
    key: 'id',
    order: 'DESC'
  }
};

module.exports = SubscriptionPlanModel;
