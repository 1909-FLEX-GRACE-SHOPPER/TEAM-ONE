import React from 'react';
import { Link } from 'react-router-dom';
import CreditCard from './CreditCard.js';
import Shipping from './Shipping.js';
import Button from 'react-bootstrap';

const Checkout = ({ orderDetails }) => {
  return (
    <div className="checkout-page">
      <Link>Back</Link>
      <div>CHECKOUT - {orderDetails.userType}</div>
      <div>BILLING</div>
      <CreditCard />
      <Shipping />
      <Button>PROCEED TO CONFIRMATION</Button>
    </div>
  );
};

export default Checkout;
