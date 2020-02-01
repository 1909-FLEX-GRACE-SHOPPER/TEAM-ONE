const { users, products, cart } = require('./seed-data.js');
const { User, Product, Cart } = require('./server/db/models/index.js');
const { db } = require('./server/db/index.js');
const { green, red } = require('chalk');
//TODO: seed userId in Cart database
const seedUsers = async () => {
  await Promise.all(users.map(_u => User.create(_u))).then(() =>
    Promise.all(cart.map(product => Cart.create(product)))
  );
};

const seedProducts = () => {
  return Promise.all(products.map(_p => Product.create(_p)));
};

// const seedCart = () => {
//   return Promise.all(cart.map(product => Cart.create(product)));
// };

module.exports = { seedUsers, seedProducts };
