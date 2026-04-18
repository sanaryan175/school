const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'school_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Auto-create table on startup
async function initDB() {
  const createTable = `
    CREATE TABLE IF NOT EXISTS schools (
      id        INT AUTO_INCREMENT PRIMARY KEY,
      name      VARCHAR(255)   NOT NULL,
      address   VARCHAR(500)   NOT NULL,
      latitude  FLOAT          NOT NULL,
      longitude FLOAT          NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createTable);
    console.log('Database initialized — schools table ready');
  } catch (err) {
    console.error('DB init error:', err.message);
  }
}

initDB();

module.exports = pool;