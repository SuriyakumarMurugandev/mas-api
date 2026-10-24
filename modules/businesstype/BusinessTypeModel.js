
const BusinessTypeModel = {
  table: 'business_types',

  columns: {
  "id": "number",
  "type_code": "string",
  "type_name": "string",
  "description": "string",
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

module.exports = BusinessTypeModel;
