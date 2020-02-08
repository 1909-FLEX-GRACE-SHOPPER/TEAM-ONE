import axios from 'axios';

const stripePaymentCall = state => {
  axios
    .post(`/api/stripe/create-payment-intent`, {
    payment_method_types: ["card"],
    amount: 100,
    shipping: state
    })
    .then(res => {
    this.props.stripe
      .handleCardPayment(res.data.client_secret)
      .catch(e => {
      console.log(e)
    })
  })
}

export default stripePaymentCall;