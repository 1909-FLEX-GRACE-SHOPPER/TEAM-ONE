const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, INTEGER, STRING, TEXT } = Sequelize;

const Cart = db.define('cart', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },

  productQuantity: {
    type: INTEGER,
  },

  shippingName: {
    type: STRING
  },

  shippingAddress: {
    type: STRING,
  },

  shippingCity: {
    type: STRING
  },

  shippingState: {
    type: STRING
  },

  shippingZip: {
    type: STRING,
    validate: {
      len: {
        args: 5
      }
    }
  },

  shippingCountry: {
    type: STRING
  },

  shippingNotes: {
    type: TEXT
  },

  cardNumber: {
    type: STRING,
    validate: {
      len: {
        arg: [13, 16]
      }
    }
  },

  cardHolder: {
    type: STRING,
  },

  expirationDate: {
    type: STRING,
  },

  securityCode: {
    type: STRING,
    validate: {
      len: {
        arg: 3
      }
    }
  },
});

module.exports = Cart;
