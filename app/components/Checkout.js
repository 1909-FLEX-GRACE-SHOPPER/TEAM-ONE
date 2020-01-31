import React from "react";

import { Switch, Route } from 'react-router-dom';

import CheckoutCrumb from './CheckoutCrumb';
import ShoppingCart from './ShoppingCart';
import CheckoutForms from './CheckoutForms';
import Confirmation from './Confirmation';

const Checkout = () => {
  return (
    <div className="checkout-page">
      <CheckoutCrumb />
      <Switch>
        <Route path='/checkout/cart' component={ ShoppingCart } />
        <Route path='/checkout/payment-information' component={ CheckoutForms } />
        <Route path='/checkout/confirmation' component={ Confirmation } />
      </Switch>
    </div>
  );
};

export default Checkout;
