const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, INTEGER, DECIMAL, BOOLEAN } = Sequelize;

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
  },

  isInCart: {
    type: BOOLEAN,
    defaultValue: false
  }
});

module.exports = CartList;
