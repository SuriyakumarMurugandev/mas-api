
const MenuModel = {
  table: 'menus',

  columns: {
  "id": "number",
  "company_id": "number",
  "parent_id": "number",
  "menu_category_id": "number",
  "key_name": "string",
  "label": "string",
  "icon": "string",
  "image_url": "string",
  "route": "string",
  "is_default": "boolean",
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

module.exports = MenuModel;
