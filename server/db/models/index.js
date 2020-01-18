//collect all models here and export at once
const Users = require('./users');
const Orders = require('./orders');
const OrderDetails = require('./order-details');
const Products = require('./products');
const Wishlist = require('./wishlist');

module.exports = {
    Users,
    Orders,
    OrderDetails,
    Products,
    Wishlist,
}