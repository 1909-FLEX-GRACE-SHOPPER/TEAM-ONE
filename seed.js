const { users, products } = require('./seed-data.js');
const { User, Product, Cart } = require('./server/db/models/index.js');

const seed = async () => {
  let [user1, user2, user3, user4, user5] = await Promise.all(
    users.map(user => User.create(user))
  );

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

  let cart3 = {
    productQuantity: 4,
    userId: user3.id,
    productId: prod1.id
  };

  let cart4 = {
    productQuantity: 5,
    userId: user4.id,
    productId: prod2.id
  };

  let cart5 = {
    productQuantity: 6,
    userId: user5.id,
    productId: prod1.id
  };

  Cart.create(cart1);
  Cart.create(cart2);
  Cart.create(cart3);
  Cart.create(cart4);
  Cart.create(cart5);
};

module.exports = seed;
