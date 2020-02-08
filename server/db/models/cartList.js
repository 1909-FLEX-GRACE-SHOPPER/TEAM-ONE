const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, INTEGER } = Sequelize;

const CartList = db.define('cartList', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },

  productQuantity: {
    type: INTEGER
  }
});

module.exports = CartList;
