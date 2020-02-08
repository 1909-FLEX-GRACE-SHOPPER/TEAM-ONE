const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, STRING, DECIMAL, TEXT } = Sequelize;

const Order = db.define('orders', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },

  orderCost: {
    //TODO: make order cost as the sum of product cost
    type: DECIMAL(10, 2),
    allowNull: false
  },

  shippingName: {
    type: STRING,
  },

  shippingAddress: {
    type: STRING,
  },

  shippingCity: {
    type: STRING,
  },

  shippingState: {
    type: STRING,
  },
  
  shippingZip: {
    type: STRING,
    validate: {
      len: {
        arg: 5
      }
    }
  },

  shippingCountry: {
    type: STRING,
    allowNull: true,
  },

  shippingNotes: {
    type: TEXT,
    allowNull: true,
  },

});

module.exports = Order;
