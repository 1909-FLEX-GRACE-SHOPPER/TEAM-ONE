//collect all models and db connection
//export everything in the database from here
const db = require('./database');
const { Users, Orders, OrderDetails, Products, Wishlist } = require('./models/index');

//set up foreign keys here, i.e. connect models

module.exports = {
    db,
    models: {
        Users,
        Orders,
        OrderDetails,
        Products,
        Wishlist,
    }
}