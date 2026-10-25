let UserModel = {
  table: 'users',

  columns: {
    id: 'number',
    name: 'string',
    email: 'string',
    status: 'number',
    role_id: 'number',

    active: 'number',
    deleted: 'number',
    created: 'date',
    modified: 'date',
    created_by: 'number',
    modified_by: 'number'
  },

  sort: {
    key: 'id',
    order: 'DESC'
  },

  status: {
    active: 1,
    inactive: 0
  },

  associations: {
    role: {
      table: 'roles',
      localKey: 'role_id',
      foreignKey: 'id'
    }
  }
};


module.exports = UserModel