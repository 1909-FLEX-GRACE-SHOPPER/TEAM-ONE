import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const CheckoutCrumb = ({ props: { location: { pathname }}}) => {
  const routes = [
    ['Cart', '/checkout/cart' ],
    ['Billing', '/checkout/billing'],
    ['Shipping', '/checkout/shipping'],
    ['Confirmation', '/checkout/confirmation']
  ];

  return (
    <Breadcrumb>
      {
        routes.map(([routeKey, routeValue]) => {
          return (
          <Breadcrumb.Item
            key={ routeKey }
            active={ pathname === routeValue ? true : false }
            href={ pathname !== routeValue ? routeValue : '' }
            >
              { routeKey }
            </Breadcrumb.Item>
            )
        })
      }
    </Breadcrumb>
  )
}

export default CheckoutCrumb