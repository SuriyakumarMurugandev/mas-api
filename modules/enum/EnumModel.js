
const EnumModel = {
  table: 'enums',

  columns: {
  "id": "number",
  "enum_group": "string",
  "enum_key": "string",
  "enum_label": "string",
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

module.exports = EnumModel;
