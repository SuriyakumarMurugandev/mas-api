
const CompanySubscriptionModel = {
  table: 'company_subscriptions',

  columns: {
  "id": "number",
  "company_id": "number",
  "plan_id": "number",
  "start_date": "date",
  "end_date": "date",
  "status": "string",
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

module.exports = CompanySubscriptionModel;
