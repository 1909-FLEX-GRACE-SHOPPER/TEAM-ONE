// define Orders model here
const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, STRING, DECIMAL } = Sequelize;

const Orders = db.define('orders', {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4,
    },
    orderCost: {
        //how to make order cost as the sum
        //of product cost?
        type: DECIMAL(10, 2),
        allowNull: false,
    },
    shippingAddress: {
        type: STRING,
    }
});

module.exports = Orders;
