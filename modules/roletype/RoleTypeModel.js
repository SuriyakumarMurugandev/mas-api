
const RoleTypeModel = {
  table: 'role_types',

  columns: {
  "id": "number",
  "role_code": "string",
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

module.exports = RoleTypeModel;
