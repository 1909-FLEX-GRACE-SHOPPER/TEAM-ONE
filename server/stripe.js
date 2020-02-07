const stripe = require('stripe')(process.env.STRIPESECRETKEY);

(async () => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
    });
})();