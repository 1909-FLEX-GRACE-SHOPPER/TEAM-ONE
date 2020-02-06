import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from 'react-stripe-elements';

export const CardSection = () => {
  return (
    <label>
      Card details
        <CardNumberElement />
        <CardExpiryElement />
        <CardCvcElement />
    </label>
  );
};