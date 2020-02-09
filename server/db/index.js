//collect all models and db connection
//export everything in the database from here
const db = require('./database');
const {
  User,
  Order,
  OrderDetail,
  Product,
  Wishlist,
  Session,
  Cart,
  CartList
} = require('./models/index');

//MODEL ASSOCIATIONS

//WISHLISTS
Product.belongsToMany(User, { through: Wishlist });
User.hasMany(Product);

//CART
User.hasOne(Cart);
Cart.belongsTo(User);

//CART ITEM
CartList.belongsTo(Cart);
Cart.hasMany(CartList);

Product.hasOne(CartList);
CartList.belongsTo(Product);

CartList.belongsTo(User);
User.hasMany(CartList);

//ORDERS
User.hasMany(Order);
Order.belongsTo(User);

//ORDER DETAILS
OrderDetail.belongsTo(Order);
Order.hasMany(OrderDetail);

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
    Session,
    Cart,
    CartList
  }
};
