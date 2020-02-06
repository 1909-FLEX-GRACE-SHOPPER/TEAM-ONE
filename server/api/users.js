const router = require('express').Router();
const { models } = require('../db/index.js');
const { User, Order, Cart, Product, Session } = models;

const { paginate, UserObject, OrderObject, CartObject } = require('./utils');
const bcrypt = require('bcrypt');

router.get('/session/:sessionId', (req, res, next) => {
  const { sessionId } = req.params;
  User.findOne({
    where: {
      sessionId
    }
  })
    .then(user => res.status(200).send(user))
    .catch(e => {
      res.status(400);
      next(e);
    });
});

//Finds, counts and serves all users
router.get('/', paginate(User), (req, res, next) => {
  res
    .status(200)
    .send(res.foundModels)
    .catch(e => {
      res.status(404);
      next(e);
    });
});

//Creates a new user and destroys the guest user associated with their session id
//Sets falsy fields in req.body that are allowed to be null to null
router.post('/new', (req, res, next) => {
  const user = new UserObject(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then(hashedPassword => {
      User.create({
        ...user,
        sessionId: req.cookies.session_id,
        password: hashedPassword
      });
    })
    .then(newUser => {
      User.destroy({
        where: {
          sessionId: req.cookies.session_id,
          userType: 'Guest'
        }
      })
        .then(() =>
          res
            .status(201)
            .cookie('session_id', req.cookies.session_id, {
              path: '/',
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
            })
            .send(newUser)
        )
        .catch(e => {
          res.status(400);
          next(e);
        });
    })
    .catch(e => {
      res.status(400);
      next(e);
    });
});

//Finds the User in the table and attaches the cookie
router.post('/login', (req, res, next) => {
  //TODO: merge the guest user's products and cart with the logged in user
  //   i.e: replace the guest user's id with the logged in user's id on all records!
  //Temporary solution: Delete the guest user before you log in the new user.
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send('User not found');
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            user
              .update({
                sessionId: req.cookies.session_id
              })
              .then(() => {
                User.destroy({
                  where: {
                    sessionId: req.cookies.session_id,
                    userType: 'Guest'
                  }
                });
              })
              .then(() => {
                return res
                  .cookie('session_id', req.cookies.session_id, {
                    path: '/',
                    expires: new Date(Date.now() + 1000 * 60 * 60)
                  })
                  .status(202)
                  .send(user);
              })
              .catch(err => res.status(401).send('Failure! ', err));
          } else {
            return res.status(401).send('Incorrect password');
          }
        });
      }
    })
    .catch(e => {
      res.status(500).send('Internal Error');
      next(e);
    });
});

//Logs out a User
router.post('/logout', (req, res, next) => {
  const { email, password } = req.body;
  User.update(
    {
      sessionId: null
    },
    {
      where: { email, password }
    }
  )
    .then(() => Session.create())
    .then(session =>
      User.create({
        userType: 'Guest',
        sessionId: session.id
      })
    )
    .then(guest => res.status(201).send(guest))
    .catch(e => {
      res.status(401);
      next(e);
    });
});

//Deletes a user based on a primary key.
router.delete('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.destroy())
    .then(() => res.status(202))
    .catch(e => {
      res.status(404);
      next(e);
    });
});

//Updates a user based on a primary key.
//Falsy fields in req.body are set to the current values.
router.put('/:id', (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    userType,
    phone,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingZip,
    billingAddress,
    billingCity,
    billingState,
    billingZip
  } = req.body;

  User.findByPk(req.params.id)
    .then(user =>
      user.update({
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        password: password || user.password,
        userType: userType || user.userType,
        phone: phone || user.phone,
        shippingAddress: shippingAddress || user.shippingAddress,
        shippingCity: shippingCity || user.shippingCity,
        shippingState: shippingState || user.shippingState,
        shippingZip: shippingZip || user.shippingZip,
        billingAddress: billingAddress || user.billingAddress,
        billingCity: billingCity || user.billingCity,
        billingState: billingState || user.billingState,
        billingZip: billingZip || user.billingZip
      })
    )
    .then(user => res.status(202).send(user))
    .catch(e => {
      res.status(304);
      next(e);
    });
});

//Finds and serves a single user based on a primary key.
//Eager loads associated orders.
router.get('/:userId/orders', (req, res, next) => {
  Order.findOne({
    where: { userId: req.params.userId }
  })
    .then(user => res.status(200).send(user))
    .catch(e => {
      res.status(404);
      next(e);
    });
});

//Creates a new order for a specific User.
router.post('/:userId/orders', (req, res, next) => {
  const orderBody = new OrderObject(req.params.userId, req.body);
  Order.create(orderBody)
    .then(() => {
      res.status(201).send('success')
    })
    .catch(e => {
      res.status(400);
      next(e);
    });
});

//Deletes an order based on a primary key.
router.delete('/:userId/order/:orderId', (req, res, next) => {
  Order.findByPk(req.params.orderId)
    .then(order => order.destroy())
    .then(() => res.status(202))
    .catch(e => {
      res.status(404);
      next(e);
    });
});

//Updates an order based on a primary key.
//Falsy fields in req.body are set to the current values.
//No need to update a userId
router.put('/:userId/orders/:orderId', (req, res, next) => {
  const { shippingAddress, orderCost } = req.body;

  Order.findByPk(req.params.orderid)
    .then(order =>
      order.update({
        shippingAddress: shippingAddress || order.shippingAddress,
        orderCost: (orderCost * 1).toFixed(2) || order.orderCost
      })
    )
    .then(() => res.status(202))
    .catch(e => {
      res.status(304);
      next(e);
    });
});

router.get('/:userId/cart', (req, res, next) => {
  Cart.findOne({
    where: { userId: req.params.userId }
  })
  .then(cart => res.status(200).send(cart))
  .catch(e => {
    res.status(404)
    next(e)
  })
});

router.post(`/:userId/cart`, (req, res, next) => {
  Cart.findOne({
    where: { userId: req.params.userId }
  })
  .then(cartOrNull => {
    if(!cartOrNull) {
      Cart.create({
        userId: req.params.userId
      })
      .then(cart => res.status(200).send(cart))
      .catch(e => {
        res.status(400);
        next(e);
      })
    } else {
      res.status(200).send(cartOrNull)
    }
  })
  .catch(e => {
    res.status(404)
    next(e)
  })
})

//edit cart for shipping and billing details
router.put(`/:userId/cart`, (req, res, next) => {
  const cartBody = new CartObject(req.body)
  Cart.findOne({
    where: { userId: req.params.userId }
  })
  .then(cart => cart.update(cartBody))
  .then(() => {
    res.status(202).send('updated')
  })
  .catch(e => {
    res.status(304);
    next(e);
  })
})

//Route for deleting a cart.
router.delete(`/:userId/cart`, (req, res, next) => {
  Cart.findOne({
    where: { userId: req.params.userId }
  })
  .then(cart => cart.destroy())
  .then(() => res.status(202).send({}))
  .catch(e => {
    res.status(404)
    next(e);
  })
})

//edit product quantity in cart
router.put('/:userId/cart/:cartId', (req, res, next) => {
  const { newQuantity } = req.body;

  Cart.findByPk(req.params.cartId)
    .then(cartItem =>
      cartItem.update({
        productQuantity: newQuantity
      })
    )
    .then(() => res.status(202))
    .catch(e => {
      res.status(304);
      next(e);
    });
});

router.delete('/:userId/cart/:cartId', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: { id: req.params.cartId }
    });
    res.status(202).send('Item deleted');
  } catch (err) {
    res.status(400).next(err);
  }
});

module.exports = router;
