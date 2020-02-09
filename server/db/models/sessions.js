const Sequelize = require('sequelize');
const db = require('./../database.js');
const { UUID, UUIDV4 } = Sequelize;

const Session = db.define('session', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  }
});

module.exports = Session;
