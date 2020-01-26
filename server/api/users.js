const router = require('express').Router();

const { models } = require('../db/index.js');
const { User, Order } = models;

const paginate = require('./utils');

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

//Finds and serves a single user based on a primary key. If the user doesn't exist creatte a guest user
router.get('/id/:userId', (req, res, next) => {
  User.findByPk(req.params.userId)
    .then(user => {
      return user
        ? res.status(200).send(user)
        : User.create({ userType: 'Guest', loggedIn: false });
    })
    .then(guest =>
      res
        .status(201)
        .cookie('uuid', guest.id, {
          path: '/',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
        })
        .send(guest)
    )
    .catch(e => {
      res.status(404);
      next(e);
    });
});

//Creates a new user/signs a user up
//Sets falsy fields in req.body that are allowed to be null to null
router.post('/', (req, res, next) => {
  console.log(req.body)
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

  User.create({
    firstName,
    lastName,
    email,
    password,
    userType: 'Existing customer',
    phone: phone || null,
    shippingAddress: shippingAddress || null,
    shippingCity: shippingCity || null,
    shippingState: shippingState || null,
    shippingZip: shippingZip || null,
    billingAddress: billingAddress || null,
    billingCity: billingCity || null,
    billingState: billingState || null,
    billingZip: billingZip || null
  })
    .then(user =>
      res
        .status(201)
        .cookie('uuid', user.id, {
          path: '/',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
        })
        .send(user)
    )
    .catch(e => {
      res.status(400);
      next(e);
    });
});

//Finds the User in the table and attaches the cookie
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email,
      password
    }
  })
    .then(userOrNull => {
      if (userOrNull) {
        User.update(
          {
            loggedIn: true
          },
          {
            where: { email, password },
            returning: true
          },
          res.cookie('uuid', userOrNull.id, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
          })
        );
        return res.status(202).send(userOrNull);
      }
      res.status(401).send('Failure!');
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
      loggedIn: false
    },
    {
      where: { email, password },
      returning: true
    }
  )
    .then(() => res.status(201))
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
  User.findByPk(req.params.userId, {
    include: [
      {
        model: Order
      }
    ]
  })
    .then(user => res.status(200).send(user))
    .catch(e => {
      res.status(404);
      next(e);
    });
});

//Creates a new order for a specific User.
router.post('/:userId/orders', (req, res, next) => {
  const { shippingAddress, orderCost } = req.body;

  const { userId } = req.params;

  Order.create({
    userId,
    shippingAddress,
    orderCost: (orderCost * 1).toFixed(2)
  })
    .then(() => res.status(201))
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

module.exports = router;
