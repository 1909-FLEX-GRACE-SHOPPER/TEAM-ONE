import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

class StripeCheckoutForm extends Component {
  constructor() {
      super();
      this.state = {
          receiptUrl: '',
      }
  }

  handleOnClick = e => {
    e.preventDefault();
    this.props.stripe.createToken()
    .then(({ token }) => {
      axios
        .post(`/api/stripe/v1/charges`, {
          source: token.id,
          amount: 1000,
          receipt_email: this.props.user.email || null,
        })
        .then(res => {
            this.setState({ receiptUrl: res.data.charge.receipt_url })
        })
    })
  };

  render() {
    const { receiptUrl } = this.state;
    return (
      <div>
        {
          receiptUrl
          ? (
            <div>
              <h3>Payment Successful!</h3>
              <a href={ receiptUrl }>View Receipt</a>
              <Nav.Link href='/'>Return to Shopping</Nav.Link>
            </div>
          )
          : (
            <div className='checkout-form'>
              <Form>
                <label>
                  Card details
                    <CardNumberElement />
                </label>
                <label>
                  Expiration date
                  <CardExpiryElement />
                </label>
                <label>
                  CVC 
                  <CardCVCElement />
                </label>
                <Button
                  onClick={ this.handleOnClick }
                  className='order-button'
                >
                  Submit Payment
                </Button>
             </Form>
           </div>
          )
        }
      </div>
    )
  }
}

const mapState = ({ user }) => ({ user });

export default connect(mapState)(injectStripe(StripeCheckoutForm));