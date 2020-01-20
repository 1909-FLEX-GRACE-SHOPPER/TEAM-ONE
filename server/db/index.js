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
