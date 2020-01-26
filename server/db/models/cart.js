const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, INTEGER } = Sequelize;

const Cart = db.define('cart', {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    productQuantity: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
});

module.exports = Cart;
