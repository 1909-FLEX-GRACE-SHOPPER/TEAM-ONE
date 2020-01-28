const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, DECIMAL, INTEGER } = Sequelize;

const OrderDetail = db.define('orderDetails', {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    productQuantity: {
        type: INTEGER,
        allowNull: false
    },
    productCost: {
        //TODO: make product cost as the product
        //of product price and product quantity
        type: DECIMAL(10, 2),
        allowNull: false
    },
});

module.exports = OrderDetail;
