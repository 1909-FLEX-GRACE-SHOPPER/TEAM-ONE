const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, INTEGER, DECIMAL } = Sequelize;

const CartList = db.define('cartList', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },

  productQuantity: {
    type: INTEGER
  },

  subtotal: {
    type: DECIMAL(10, 2),
    defaultValue: 0
  }
});

module.exports = CartList;
