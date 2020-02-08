const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = require('express').Router();

router.post('/create-payment-intent', (req, res, next) => {
  const {
    amount,
    shipping: {
      name,
      address
    }
  } = req.body

  stripe.paymentIntents.create({
    amount: amount * 100 || 100,
    currency: 'usd',
    shipping: {
      name,
      address,
    },
  })
  .then(paymentIntent => {
    res.status(200)
    .send(paymentIntent)
  })
  .catch(e => {
    res.status(500);
    next(e);
  })
})

module.exports = router