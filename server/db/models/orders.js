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
    allowNull: false
  },

  shippingAddress: {
    type: STRING,
    allowNull: false
  },

  shippingCity: {
    type: STRING,
    allowNull: false
  },

  shippingState: {
    type: STRING,
    allowNull: false
  },
  
  shippingZip: {
    type: STRING,
    allowNull: false,
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

  cardNumber: {
    type: STRING,
    allowNull: false,
    validate: {
      len: {
        arg: [13, 16]
      }
    }
  },

  cardHolder: {
    type: STRING,
    allowNull: false
  },

  expirationDate: {
    type: STRING,
    allowNull: false
  },

  securityCode: {
    type: STRING,
    allowNull: false,
    validate: {
      len: {
        arg: 3
      }
    }
  },

});

module.exports = Order;
