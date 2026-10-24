
const CompanyModel = {
  table: 'companies',

  columns: {
  "id": "number",
  "company_name": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
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

module.exports = CompanyModel;
