
const SubscriptionPaymentModel = {
  table: 'subscription_payments',

  columns: {
  "id": "number",
  "company_subscription_id": "number",
  "amount": "number",
  "payment_date": "date",
  "payment_method": "string",
  "transaction_id": "string",
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

module.exports = SubscriptionPaymentModel;
