const router = require('express').Router();

const { models } = require('../db/index.js');

const { Wishlist } = models;

router.get('/items/:userId', (req, res, next) => {
  Wishlist.findAll({
    where: {
      userId: req.params.userId
    }
  })
    .then(wishlist => res.status(200).send(wishlist))
    .catch(e => {
      res.status(400);
      next(e);
    });
});
//TODO #1: may add userId to the route
//TODO #2: may create instance including userId
router.post('/add', (req, res, next) => {
  const productId = req.body.productId;
  Wishlist.create({ productId: productId })
    .then(item => res.status(201).send(item))
    .catch(e => {
      res.status(400);
      next(e);
    });
});

router.delete('/remove/:id', (req, res, next) => {
  Wishlist.findByPk(req.params.id)
    .then(item => item.destroy())
    .then(() => res.status(200).send('Item deleted'))
    .catch(e => {
      res.status(400);
      next(e);
    });
});

module.exports = router;
