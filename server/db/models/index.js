//collect all models here and export at once
const User = require('./users');
const Order = require('./orders');
const OrderDetail = require('./order-details');
const Product = require('./products');
const Wishlist = require('./wishlist');
const Session = require('./sessions')

module.exports = {
    User,
    Order,
    OrderDetail,
    Product,
    Wishlist,
    Session
}
