import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const CheckoutCrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href='/checkout/cart'>Cart</Breadcrumb.Item>
      <p> - </p>
      <Breadcrumb.Item href='/checkout/payment-information'>Shipping and Billing</Breadcrumb.Item>
      <p> - </p>
      <Breadcrumb.Item href='/checkout/confirmation'>Confirmation</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default CheckoutCrumb