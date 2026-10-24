
const RoleModel = {
  table: 'roles',

  columns: {
  "id": "number",
  "branch_id": "number",
  "role_type_id": "number",
  "role_name": "string",
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

module.exports = RoleModel;
