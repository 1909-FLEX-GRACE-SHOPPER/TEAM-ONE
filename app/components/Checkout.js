import React from "react";

import { Switch, Route } from 'react-router-dom';

import CheckoutCrumb from './CheckoutCrumb';
import ShoppingCart from './ShoppingCart';
import BillingForm from './BillingForm';
import Shipping from './Shipping';
import Confirmation from './Confirmation';

const Checkout = props => {
  return (
    <div className="checkout-page">
      <CheckoutCrumb props={ props } />
      <Switch>
        <Route path='/checkout/cart' component={ ShoppingCart } />
        <Route path='/checkout/billing' component={ BillingForm } />
        <Route path='/checkout/shipping' component={ Shipping } />
        <Route path='/checkout/confirmation' component={ Confirmation } />
      </Switch>
    </div>
  );
};

export default Checkout;
