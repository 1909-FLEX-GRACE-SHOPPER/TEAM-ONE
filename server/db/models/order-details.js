// define OrderDetails model here
const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, DECIMAL, INTEGER } = Sequelize;

const OrderDetails = db.define('orderDetails', {
    orderDetailsId: {
        //how to define the orderDetailsId as concat(orderId, productId)?
        primaryKey: true,
        type: UUID,
    },
    productQuantity: {
        type: INTEGER,
        allowNull: false,
    },
    productCost: {
        //how to make product cost as the product
        //of product price and product quantity?
        type: DECIMAL(10, 2),
        allowNull: false,
    },
});

module.exports = OrderDetails;
