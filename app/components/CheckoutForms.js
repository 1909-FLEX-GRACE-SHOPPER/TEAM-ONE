import React from 'react';
import ShippingForm from './ShippingForm.js';
import BillingForm from './BillingForm';

const CheckoutForms = () => {
  return (
    <div>
      <ShippingForm />
      <BillingForm />
    </div>
  )
}

export default CheckoutForms;