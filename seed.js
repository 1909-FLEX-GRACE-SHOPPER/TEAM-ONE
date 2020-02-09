const { users, products } = require('./seed-data.js');
const { User, Product } = require('./server/db/models/index.js');

const seed = async () => {
  await Promise.all(users.map(user => User.create(user)));

  await Promise.all(products.map(product => Product.create(product)));
};

module.exports = seed;
