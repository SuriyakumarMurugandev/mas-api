
const BusinessModel = {
  table: 'businesses',

  columns: {
  "id": "number",
  "company_id": "number",
  "business_type_id": "number",
  "business_name": "string",
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

module.exports = BusinessModel;
