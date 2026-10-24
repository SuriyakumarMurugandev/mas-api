
const MenuCategoryModel = {
  table: 'menu_categories',

  columns: {
  "id": "number",
  "category_code": "string",
  "category_name": "string",
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

module.exports = MenuCategoryModel;
