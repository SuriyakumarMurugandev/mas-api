
const UserAccessModel = {
  table: 'user_access',

  columns: {
  "id": "number",
  "user_id": "number",
  "company_id": "number",
  "branch_id": "number",
  "role_id": "number",
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

module.exports = UserAccessModel;
