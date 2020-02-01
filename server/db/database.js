// This module is to establish a connection to the Postgres database
// by creating a Sequelize instance (called "db").

const pkg = require('../../package.json');

const dbName =
  process.env.NODE_ENV === 'test' ? pkg['db-test-name'] : pkg['db-name'];

const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {
    logging: false,
  }
);

module.exports = db;
