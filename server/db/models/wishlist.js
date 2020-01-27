const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4 } = Sequelize;

const Wishlist = db.define('wishlist', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  }
});

module.exports = Wishlist;
