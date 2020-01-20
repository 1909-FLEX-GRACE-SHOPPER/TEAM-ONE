//collect all models and db connection
//export everything in the database from here
const db = require('./database');
const {
  User,
  Order,
  //OrderDetail,
  Product,
  Wishlist
} = require('./models/index');

//MODEL ASSOCIATIONS

//WISHLIST
Product.belongsToMany(User, { through: Wishlist });
// User.hasOne(Wishlist);
// Wishlist.belongsTo(User);
//Wishlist.hasMany(Product);

//ORDERS
User.hasMany(Order);
Order.belongsTo(User);

//ORDER DETAILS
Product.belongsToMany(Order, { through: 'orderDetails' });
// Order.hasMany(OrderDetail);
// OrderDetail.belongsTo(Order);
//OrderDetail.hasMany(Product);

module.exports = {
  db,
  models: {
    User,
    Order,
    //OrderDetail,
    Product,
    Wishlist
  }
};
