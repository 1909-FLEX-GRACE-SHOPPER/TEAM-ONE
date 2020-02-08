import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import StripeCheckoutForm from './StripeCheckoutForm';

const StripeCheckout = ({ history }) => {
  return (
    <StripeProvider apiKey='pk_test_Pr9CMjqYSqqZbXAdWSo9BMU9003qqmipmB'>
      <Elements>
        <StripeCheckoutForm history={ history }/>
      </Elements>
    </StripeProvider>
  )
}

export default StripeCheckout;