//collect all models and db connection
//export everything in the database from here
const db = require('./database');
const {
  User,
  Order,
  OrderDetail,
  Product,
  Wishlist
} = require('./models/index');

//set up associations here
//Wishlist gets the association key as userId
User.hasMany(Wishlist);
Wishlist.hasOne(User);
//Wishlist gets the association key as productId
Product.hasMany(Wishlist);
Wishlist.hasMany(Product);
//Orders gets the association key as userId
User.hasMany(Order);
Order.hasOne(User);
//OrderDetails gets the association key as orderId
Order.hasMany(OrderDetail);
OrderDetail.hasOne(Order);
//OrderDetails gets the association key as productId
Product.hasMany(OrderDetail);
OrderDetail.hasMany(Product);

module.exports = {
  db,
  models: {
    User,
    Order,
    OrderDetail,
    Product,
    Wishlist
  }
};
