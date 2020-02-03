const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, STRING, DECIMAL, INTEGER, BIGINT, DATEONLY } = Sequelize;

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
  firstName: {
    type: STRING,
    allowNull: false
  },
  lastName: {
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
      isNumeric: {
        args: true,
        msg: 'Shipping zip code should only contain numbers'
      },
      len: {
        arg: 5
      }
    }
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
  cardholder: {
    type: STRING,
    allowNull: false
  },
  expirationDate: {
    type: DATEONLY,
    allowNull: false
  },
  securityCode: {
    type: STRING,
    allowNull: false,
    validate: {
      isNumeric: {
        args: true,
        msg: 'Security code should only contain numbers'
      },
      len: {
        arg: 3
      }
    }
  },
  billingAddress: {
    type: STRING,
    allowNull: false
  },
  billingCity: {
    type: STRING,
    allowNull: false
  },
  billingState: {
    type: STRING,
    allowNull: false
  },
  billingZip: {
    type: STRING,
    allowNull: false,
    validate: {
      isNumeric: {
        args: true,
        msg: 'Billing zip code should only contain numbers'
      },
      len: {
        arg: 5
      }
    }
  }
});

module.exports = Order;
