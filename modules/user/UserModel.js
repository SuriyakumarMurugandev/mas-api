
const UserModel = {
  table: 'users',

  columns: {
  "id": "number",
  "company_id": "number",
  "branch_id": "number",
  "role_id": "number",
  "user_name": "string",
  "email": "string",
  "password_hash": "string",
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

module.exports = UserModel;
