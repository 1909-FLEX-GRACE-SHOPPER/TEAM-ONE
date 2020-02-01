//collect all models and db connection
//export everything in the database from here
const db = require('./database');
const {
  User,
  Order,
  OrderDetail,
  Product,
  Wishlist,
<<<<<<< HEAD
  Cart,
=======
  Session,
  Cart
>>>>>>> 44265208d95366a9270609dc18b55659e469c408
} = require('./models/index');

//MODEL ASSOCIATIONS

//WISHLISTS
Product.belongsToMany(User, { through: Wishlist });
User.hasMany(Product);

//CART
Product.belongsToMany(User, { through: Cart });
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
<<<<<<< HEAD
    Cart,
  },
=======
    Session,
    Cart
  }
>>>>>>> 44265208d95366a9270609dc18b55659e469c408
};
