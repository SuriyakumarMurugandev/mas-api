
const CompanyMenuModel = {
  table: 'company_menus',

  columns: {
  "id": "number",
  "company_id": "number",
  "menu_id": "number",
  "is_custom": "boolean",
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

module.exports = CompanyMenuModel;
