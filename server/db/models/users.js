//define Users model here
const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, STRING, BOOLEAN, INTEGER, DATEONLY } = Sequelize;

const User = db.define('users', {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4,
    },
    userType: {
        type: STRING,
        allowNull: false,
        //may need to update this later depends on how a user chooses his type
        validate: {
            isIn: [
                ['Guest', 'Existing customer', 'Admin']
            ],
        },
    },
    loggedIn: {
        type: BOOLEAN,
        defaultValue: false,
    },
    email: {
        type: STRING,
        allowNull: true,
        unique: true,
        validate: {
            customValidator(value) {
                if (value === null && this.userType !== 'Guest') {
                    throw new Error('Email address cannot be null unless user type is guest')
                };
            },
            isEmail: {
                arg: true,
                msg: 'Email address must be valid',
            }

        },
    },
    password: {
        //password is not required to guest, but required to admin and existing customer
        //need to figure out how to make it notNull when userType is "Admin" or "Existing Customer"
        type: STRING,
        allowNull: true,
        unique: true,
        validate: {
            customValidator(value) {
                if (value === null && this.userType !== 'Guest') {
                    throw new Error('Password cannot be null unless user type is guest')
                };
            },
            len: {
                arg: 6,
            }
        }
    },
    firstName: {
        type: STRING,
    },
    lastName: {
        type: STRING,
    },
    phone: {
        type: INTEGER,
        validate: {
            isNumeric: {
                args: true,
                msg: 'Phone number should only contain numbers',
            },
            len: {
                //we may want to change the length when we want to pursue internationalization
                arg: 10,
            }
        }
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
        type: INTEGER,
        validate: {
            isNumeric: {
                args: true,
                msg: 'Shipping zip code should only contain numbers',
            },
            len: {
                arg: 5,
            }
        }
    },
    cardNumber: {
        type: INTEGER,
        validate: {
            isNumeric: {
                args: true,
                msg: 'Card number should only contain numbers',
            },
            len: {
                arg: 16,
            }
        }
    },
    cardholder: {
        type: STRING,
    },
    expirationDate: {
        type: DATEONLY,
    },
    securityCode: {
        type: INTEGER,
        validate: {
            isNumeric: {
                args: true,
                msg: 'Security code should only contain numbers',
            },
            len: {
                arg: 3,
            }
        }
    },
    billingAddress: {
        type: STRING,
    },
    billingCity: {
        type: STRING,
    },
    billingState: {
        type: STRING,
    },
    billingZip: {
        type: INTEGER,
        validate: {
            isNumeric: {
                args: true,
                msg: 'Billing zip code should only contain numbers',
            },
            len: {
                arg: 5,
            },
        },
    },

})

module.exports = User;
