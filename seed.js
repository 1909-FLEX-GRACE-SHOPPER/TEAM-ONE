const { users, products } = require('./seed-data.js');
const { User, Product, Cart } = require('./server/db/models/index.js');

const seed = async () => {
  let [user1, user2] = await Promise.all(users.map(user => User.create(user)));

  let [prod1, prod2] = await Promise.all(
    products.map(product => Product.create(product))
  );

  let cart1 = {
    productQuantity: 2,
    userId: user1.id,
    productId: prod1.id
  };
  let cart2 = {
    productQuantity: 3,
    userId: user2.id,
    productId: prod2.id
  };

  Cart.create(cart1);
  Cart.create(cart2);
};

module.exports = seed;
