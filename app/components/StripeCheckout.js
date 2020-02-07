import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import StripeCheckoutForm from './StripeCheckoutForm';

const StripeCheckout = () => {
  return (
    <StripeProvider apiKey='pk_test_Pr9CMjqYSqqZbXAdWSo9BMU9003qqmipmB'>
      <Elements>
        <StripeCheckoutForm />
      </Elements>
    </StripeProvider>
  )
}

export default StripeCheckout;