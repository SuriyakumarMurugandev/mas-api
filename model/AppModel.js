const db = require('../db/connection');

function BaseModel(config) {
  const pool = db.getPool();

  return {
    table: config.table,
    columns: config.columns || {},
    sort: config.sort || null,
    associations: config.associations || {},
    status: config.status || {},

    // ✅ RAW QUERY
    async raw(sql) {
      const [rows] = await pool.query(sql);
      return rows;
    },

    // ✅ SAFE QUERY
    async query(sql, params = []) {
      const [rows] = await pool.execute(sql, params);
      return rows;
    },

    // ✅ CREATE
    async create(data) {
      const keys = Object.keys(data);
      const values = Object.values(data);

      const sql = `
        INSERT INTO ${this.table} (${keys.join(',')})
        VALUES (${keys.map(() => '?').join(',')})
      `;

      return this.query(sql, values);
    },

    // ✅ FIND (auto: active=1, deleted=0)
    async find(options = {}) {
      const where = options.where || {};
      const order = options.order || this.sort;

      // ✅ Enforce system filters
      where.active = 1;
      where.deleted = 0;

      const keys = Object.keys(where).filter(k => where[k] !== undefined);

      const whereClause =
        'WHERE ' + keys.map(k => `${k} = ?`).join(' AND ');

      const values = keys.map(k => where[k]);

      const orderClause = order
        ? `ORDER BY ${order.key} ${order.order}`
        : '';

      const sql = `
        SELECT * FROM ${this.table}
        ${whereClause}
        ${orderClause}
      `;

      return this.query(sql, values);
    },

    // ✅ FIND ALL
    async findAll() {
      return this.find();
    },

    // ✅ UPDATE
    async update(where, data) {
      const keys = Object.keys(data);
      const values = Object.values(data);

      const updates = keys.map(k => `${k} = ?`).join(',');

      const whereKeys = Object.keys(where);
      const whereClause =
        whereKeys.map(k => `${k} = ?`).join(' AND ');

      const whereValues = Object.values(where);

      const sql = `
        UPDATE ${this.table}
        SET ${updates}, modified = NOW()
        WHERE ${whereClause}
      `;

      return this.query(sql, [...values, ...whereValues]);
    },

    // ✅ SOFT DELETE (your pattern ✅)
    async delete(where) {
      const keys = Object.keys(where);
      const whereClause = keys.map(k => `${k} = ?`).join(' AND ');
      const values = Object.values(where);

      const sql = `
        UPDATE ${this.table}
        SET active = 0,
            deleted = 1,
            modified = NOW()
        WHERE ${whereClause}
      `;

      return this.query(sql, values);
    },

    // ✅ BULK INSERT
    async bulkInsert(dataArray) {
      if (!dataArray.length) return;

      const keys = Object.keys(dataArray[0]);
      const values = dataArray.map(obj =>
        keys.map(k => obj[k])
      );

      const sql = `
        INSERT INTO ${this.table} (${keys.join(',')})
        VALUES ?
      `;

      const conn = await db.getConnection();
      try {
        await conn.query(sql, [values]);
      } finally {
        conn.release();
      }
    },

    // ✅ BULK UPDATE
    async bulkUpdate(dataArray, key = 'id') {
      const conn = await db.getConnection();

      try {
        await conn.beginTransaction();

        for (const row of dataArray) {
          const idValue = row[key];
          const data = { ...row };
          delete data[key];

          const keys = Object.keys(data);
          const values = Object.values(data);

          const updates = keys.map(k => `${k} = ?`).join(',');

          const sql = `
            UPDATE ${this.table}
            SET ${updates}, modified = NOW()
            WHERE ${key} = ?
          `;

          await conn.query(sql, [...values, idValue]);
        }

        await conn.commit();
      } catch (err) {
        await conn.rollback();
        throw err;
      } finally {
        conn.release();
      }
    }
  };
}

module.exports = BaseModel;