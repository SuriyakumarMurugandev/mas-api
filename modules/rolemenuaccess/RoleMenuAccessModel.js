
const RoleMenuAccessModel = {
  table: 'role_menu_access',

  columns: {
  "id": "number",
  "company_id": "number",
  "role_id": "number",
  "menu_id": "number",
  "can_view": "boolean",
  "can_edit": "boolean",
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

module.exports = RoleMenuAccessModel;
