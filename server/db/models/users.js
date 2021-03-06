const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, STRING, BOOLEAN, INTEGER, DATEONLY, BIGINT } = Sequelize;

const User = db.define('users', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  userType: {
    type: STRING,
    allowNull: false,
    //may need to update this later depends on how a user chooses his type
    validate: {
      isIn: [['Guest', 'Existing customer', 'Admin', ,'GitHub User']]
    }
  },
  email: {
    type: STRING,
    allowNull: true,
    unique: true,
    validate: {
      customValidator(value) {
        if (value === null && this.userType !== 'Guest') {
          throw new Error(
            'Email address cannot be null unless user type is guest'
          );
        }
      },
      isEmail: {
        arg: true,
        msg: 'Email address must be valid'
      }
    }
  },
  password: {
    //password is not required to guest, but required to admin and existing customer
    //need to figure out how to make it notNull when userType is "Admin" or "Existing Customer"
    type: STRING,
    allowNull: true,
    validate: {
      customValidator(value) {
        if (value === null && this.userType !== 'Guest') {
          throw new Error('Password cannot be null unless user type is guest');
        }
      },
      len: {
        arg: [8, 20]
      }
    }
  },
  firstName: {
    type: STRING
  },
  lastName: {
    type: STRING
  },
  phone: {
    //TODO: Change this to String type to allow storing formating
    type: BIGINT,
    validate: {
      isNumeric: {
        args: true,
        msg: 'Phone number should only contain numbers'
      },
      len: {
        //we may want to change the length when we want to pursue internationalization
        arg: 10
      }
    }
  },
  shippingAddress: {
    type: STRING
  },
  shippingCity: {
    type: STRING
  },
  shippingState: {
    type: STRING
  },
  shippingZip: {
    type: INTEGER,
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
  },
  cardholder: {
    type: STRING
  },
  expirationDate: {
    type: DATEONLY
  },
  securityCode: {
    type: STRING,
  },
  billingAddress: {
    type: STRING
  },
  billingCity: {
    type: STRING
  },
  billingState: {
    type: STRING
  },
  billingZip: {
    type: INTEGER,
    validate: {
      isNumeric: {
        args: true,
        msg: 'Billing zip code should only contain numbers'
      },
      len: {
        arg: 5
      }
    }
  },
  github_access_token: {
    type: STRING,
  }
});

module.exports = User;
