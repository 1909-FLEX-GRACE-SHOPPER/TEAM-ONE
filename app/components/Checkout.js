import React from "react";

import { Switch, Route } from 'react-router-dom';

import CheckoutCrumb from './CheckoutCrumb';
import ShoppingCart from './ShoppingCart';
import Billing from './Billing';
import Shipping from './Shipping';
import Confirmation from './Confirmation';

const Checkout = props => {
  return (
    <div className="checkout-page">
      <CheckoutCrumb props={ props } />
      <Switch>
        <Route path='/checkout/cart' component={ ShoppingCart } />
        <Route path='/checkout/billing' props={ props } component={ Billing } />
        <Route path='/checkout/shipping' props={ props } component={ Shipping } />
        <Route path='/checkout/confirmation' component={ Confirmation } />
      </Switch>
    </div>
  );
};

export default Checkout;
