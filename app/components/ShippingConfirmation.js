import React from 'react';
import { connect } from 'react-redux';

const ShippingConfirmation = props => {
  const {
    shippingName, 
    shippingAddress,
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry,
    shippingNotes,
  } = props.cart

  return (
    <div>
      <h3>Shipping Information</h3>
      {
        shippingName ||
        shippingAddress ||
        shippingCity ||
        shippingState ||
        shippingZip
          ? (
            <div>
              <a href='/checkout/shipping'>Edit</a>
              <p>{ shippingName }</p>
              <p>{ shippingAddress }</p>
              <p>{ shippingCity }, { shippingState } { shippingZip }</p>
              <p>{ shippingCountry }</p>
              <p>{ shippingNotes }</p>
            </div>
          )
          : (
            <div>
              <a href='/checkout/shipping'>Add a Shipping Address</a>
            </div>
        )
      }
    </div>
  )
}

const mapState = ({ cart }) => ({ cart })

export default connect(mapState)(ShippingConfirmation)