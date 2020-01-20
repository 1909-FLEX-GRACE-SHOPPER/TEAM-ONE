const { users, products } = require('./seed-data.js');
const { User, Product } = require('./server/db/models/index.js');

const seedUsers = () => {
  return Promise.all(users.map(_u => User.create(_u)));
};

const seedProducts = () => {
  return Promise.all(products.map(_p => Product.create(_p)));
};

module.exports = { seedUsers, seedProducts };
