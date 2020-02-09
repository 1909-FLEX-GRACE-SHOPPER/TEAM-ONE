const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, DECIMAL } = Sequelize;

const Order = db.define('orders', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },

  orderCost: {
    type: DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = Order;
