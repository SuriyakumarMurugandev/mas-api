
const BranchModel = {
  table: 'branches',

  columns: {
  "id": "number",
  "business_id": "number",
  "company_id": "number",
  "branch_name": "string",
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

module.exports = BranchModel;
