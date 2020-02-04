const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, INTEGER } = Sequelize;

const Cart = db.define('cart', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  productQuantity: {
    type: INTEGER,
    allowNull: false
  }
});

module.exports = Cart;
