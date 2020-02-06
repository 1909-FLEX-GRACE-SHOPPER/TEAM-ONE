import React from 'react';
import { CardElement } from 'react-stripe-elements';

const CardSection = () => {
  return (
    <label>
      Card details
      <CardElement />
    </label>
  );
};

export default CardSection;