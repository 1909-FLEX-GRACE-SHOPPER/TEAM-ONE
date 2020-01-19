//define Users model here
const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, STRING, BOOLEAN, INTEGER, DATEONLY } = Sequelize;

const Users = db.define('users', {
    userId: {
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
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Email address cannot be empty',
            },
            notNull: {
                arg: true,
                msg: 'Email address cannot be null',
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
        validate: {
            len: {
                arg: 6,
            }
        }
    },
    firstName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'First name cannot be empty',
            },
            notNull: {
                arg: true,
                msg: 'First name cannot be null',
            },
        },
    },
    lastName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Last name cannot be empty',
            },
            notNull: {
                arg: true,
                msg: 'Last name cannot be null',
            },
        },
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
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Shipping address cannot be empty',
            },
            notNull: {
                args: true,
                msg: 'Shipping address cannot be null',
            },
        }
    },
    shippingCity: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Shipping city cannot be empty',
            },
            notNull: {
                args: true,
                msg: 'Shipping city cannot be null',
            },
        },
    },
    shippingState: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Shipping state cannot be empty',
            },
            notNull: {
                args: true,
                msg: 'Shipping state cannot be null',
            },
        },
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
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Cardholder cannot be empty',
            },
            notNull: {
                arg: true,
                msg: 'Cardholder cannot be null',
            },
        },
    },
    expirationDate: {
        type: DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Expiration date cannot be empty',
            },
            notNull: {
                arg: true,
                msg: 'Expiration date cannot be null',
            },
        },
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
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Billing address cannot be empty',
            },
            notNull: {
                args: true,
                msg: 'Billing address cannot be null',
            },
        }
    },
    billingCity: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Billing city cannot be empty',
            },
            notNull: {
                args: true,
                msg: 'Billing city cannot be null',
            },
        },
    },
    billingState: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Billing state cannot be empty',
            },
            notNull: {
                args: true,
                msg: 'Billing state cannot be null',
            },
        },
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

module.exports = Users;
