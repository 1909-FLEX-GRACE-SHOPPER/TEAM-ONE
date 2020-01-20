//collect all models and db connection
//export everything in the database from here
const db = require('./database');
const { Users, Orders, OrderDetails, Products, Wishlist } = require('./models/index');

//set up associations here
//Wishlist gets the association key as userId
Users.hasOne(Wishlist);
//Wishlist gets the association key as productId
Products.hasMany(Wishlist);
//Orders gets the association key as userId
Users.hasMany(Orders);
//OrderDetails gets the association key as orderId
Orders.hasOne(OrderDetails);
//OrderDetails gets the association key as productId
Products.hasMany(OrderDetails);


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
