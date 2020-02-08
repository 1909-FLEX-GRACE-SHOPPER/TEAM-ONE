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
      name: '',
      address: {
        line1: '',
        city: '',
        postal_code: '',
        state: '',
        country: '',
      }
    }
  }

  handleOnChange = ({ target: { name, value }}) => {
    if(name === 'name') {
      this.setState({ [name]: value })
    } else {
      this.setState({ ...this.state, address: { ...this.state.address, [name]: value } })
    }
  }

  handleOnClick = e => {
    e.preventDefault();
    axios
      .post(`/api/stripe/create-payment-intent`, {
        customer: this.props.user.id,
        payment_method_types: ["card"],
        amount: 100,
        shipping: this.state
      })
      .then(res => {
        this.props.stripe
          .confirmCardPayment(res.data.client_secret, {
            payment_method: {
              billing_details: {

              }
            }
          })
          .then(payload => {
            axios
              .post(`/api/stripe/create-customer`, {
                payment_method: {
                  card: payload,
                },
                setup_future_usage: 'off_session'
              })
              .then(res => {
                console.log(res)
              })
          })
          .catch(e => {
            console.error(e)
          })
    })

  }

  render() {
    const {
      name,
      address: {
        line1,
        city,
        postal_code,
        state,
        country,
      }
    } = this.state;

    return (
      <div>
        {
          false
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
                <div>
                  <label>
                    Recipients Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={ name }
                    onChange={ this.handleOnChange }
                  />
                </div>
                <label>
                  Address
                </label>
                <input
                  type='text'
                  name='line1'
                  value={ line1 }
                  onChange={ this.handleOnChange }
                />
                <label>
                  City
                </label>
                <input
                  type='text'
                  name='city'
                  value={ city }
                  onChange={ this.handleOnChange }
                />
                <label>
                  Zip Code
                </label>
                <input
                  type='text'
                  name='postal_code'
                  value={ postal_code }
                  onChange={ this.handleOnChange }
                />
                <label>
                  State
                </label>
                <input
                  type='text'
                  name='state'
                  value={ state }
                  onChange={ this.handleOnChange }
                />
                <label>
                  Country 
                </label>
                <input
                  type='text'
                  name='country'
                  value={ country }
                  onChange={ this.handleOnChange }
                />
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