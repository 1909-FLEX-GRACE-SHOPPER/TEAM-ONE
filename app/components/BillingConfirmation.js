import React from 'react';
import { connect } from 'react-redux';

const BillingConfirmation = props => {
  const {
    cardHolder,
    cardNumber,
    expirationDate,
    securityCode
  } = props.cart

  return (
    <div>
      <h3>Billing information</h3>
      {
        cardHolder ||
        cardNumber ||
        expirationDate ||
        securityCode
        ? (
          <div>
            <a href='/checkout/billing'>Edit</a>
            <p>{ cardHolder }</p>
            <p>cardNumber number:{ cardNumber } Expiration: { expirationDate } Security: { securityCode }</p>
          </div>
        )
        : (
          <div>
            <a href='/checkout/billing'>Add Billing Information</a>
          </div>
        )
      }
    </div>
  )
}

const mapState = ({ cart }) => ({ cart })

export default connect(mapState)(BillingConfirmation)