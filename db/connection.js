const mysql = require('mysql2/promise');
require('dotenv').config();

class DBConnection {
  constructor() {
    if (!DBConnection.pool) {
      DBConnection.pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
      });
    }
  }

  getPool() {
    return DBConnection.pool;
  }

  async getConnection() {
    return await DBConnection.pool.getConnection();
  }
}

module.exports = new DBConnection();