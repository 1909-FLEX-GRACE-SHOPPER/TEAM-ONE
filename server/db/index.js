//collect all models and db connection
//export everything in the database from here
const db = require('./database');
const {
  User,
  Order,
  OrderDetail,
  Product,
  Wishlist,
  Session
} = require('./models/index');

//MODEL ASSOCIATIONS

//WISHLISTS
Product.belongsToMany(User, { through: Wishlist });
User.hasMany(Product);

//ORDERS
User.hasMany(Order);
Order.belongsTo(User);

//ORDER DETAILS
Product.belongsToMany(Order, { through: OrderDetail });
Order.belongsToMany(Product, { through: OrderDetail });

//Sessions 
Session.hasOne(User);
User.belongsTo(Session);

module.exports = {
  db,
  models: {
    User,
    Order,
    OrderDetail,
    Product,
    Wishlist,
    Session
  }
};
