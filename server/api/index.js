const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

router.use((req, res, next) => {
  const err = new Error('API route not found');
  res.status(404);
  next(err);
});

module.exports = router;
