const { users, products, cart } = require('./seed-data.js');
const { User, Product, Cart } = require('./server/db/models/index.js');
const { db } = require('./server/db/index.js');
const { green, red } = require('chalk');
//TODO: seed userId in Cart database

//In this function, store all the users into variables. you can do this easily with array destructuring.
//(i.e. const [user1, user2, user3 ... ] = Promise.all(users.map ...)
//After the users are done seeding and stored in variables, when you Create the cart items. I think I would keep the amount
//of created carts small (maybe 3/4 max for proof of concept), and do this one-by-one without Promise.all.
//You can now set the foreign keys to ids stored in variables (userId = user1.id). The problem before is that
//the userId was changing everytime it seeded, so you couldn't hardcode in an id. LMK any questions.
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
