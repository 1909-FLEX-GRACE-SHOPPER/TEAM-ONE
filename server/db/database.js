// This module is to establish a connection to the Postgres database
// by creating a Sequelize instance (called "db").
const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/grace-shopper', {
    logging: false,
});

module.exports = { db };
