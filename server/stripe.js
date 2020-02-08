const stripe = require('stripe')(process.env.STRIPESECRETKEY);

async function postCharge(req, res, next) {
  try {
    const { amount, source } = req.body; 
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source,
    })
  
    if(!charge) throw new Error('charge unsuccessful')

    res.status(200).send({
      message: 'charge posted successfully',
      charge
    })
  } catch (e) {
      res.status(500).send(e);
  }
  
}

module.exports = postCharge;