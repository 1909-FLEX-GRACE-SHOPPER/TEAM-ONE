const { users, products, carts } = require("./seed-data.js");
const { User, Product, Cart } = require("./server/db/models/index.js");

const seedUsers = () => {
  return Promise.all(users.map(_u => User.create(_u)));
};

const seedProducts = () => {
  return Promise.all(products.map(_p => Product.create(_p)));
};

const seedCarts = () => {
  return Promise.all(carts.map(product => Cart.create(product)));
};
module.exports = { seedUsers, seedProducts, seedCarts };
