import React, { Component } from 'react';
import axios from 'axios'
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

import { deleteCart } from '../redux/thunks/CartThunks';
import { postOrder } from '../redux/thunks/OrderThunks';

import Loading from './Loading'

import { SUCCESS } from '../redux/thunks/utils';

class StripeCheckoutForm extends Component {
  constructor() {
    super();
    this.state = {
      cardReady: false,
      name: '',
      address: {
        line1: '',
        city: '',
        postal_code: '',
        state: '',
        country: '',
      },
      errors: {
        nameError: '',
        line1Error: '',
        cityError: '',
        postal_codeError: '',
        stateError: '',
        countryError: '',
      }
    }
  }

  validate = (field, value) => {
    const { errors } = this.state
    switch(field) {
      case 'name':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              nameError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              nameError: ''
            }
          })
        }
        break;
      
      case 'line1': 
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              line1Error: 'Required field',
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              line1Error: '',
            }
          })
        }
        break;
    
      case 'city':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              cityError: 'required field',
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              cityError: '',
            }
          })
        }
        break;

      case 'postal_code':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              postal_codeError: 'Required field'
            }
          })
        } else if(!value.match(/^[0-9]{5}$/)) {
          this.setState({
            errors: {
              ...errors,
              postal_codeError: 'Invalid Zip Code'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              postal_codeError: ''
            }
          })
        }
        break;

      case 'state':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              stateError: 'Required field',
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              stateError: '',
            }
          })
        }
        break;

        case 'country':
          if(!value) {
            this.setState({
              errors: {
                ...errors,
                countryError: 'Required field'
              }
            })
          } else {
            this.setState({
              errors: {
                ...errors,
                countryError: ''
              }
            })
          }
          break;

        default:
          break;
    }
  }

  componentDidMount() {
    this.setState({ cardReady: true })
  }

  handleOnChange = ({ target: { name, value }}) => {
    if(name === 'name') {
      this.setState(
        { [name]: value },
        () => this.validate(name, value)
      )
    } else {
      this.setState(
        { ...this.state,
          address: {
            ...this.state.address,
            [name]: value 
          } 
        },
        () => this.validate(name, value)
      )
    }
  }

  handleOnClick = e => {
    e.preventDefault();
    axios
      .post(`/api/stripe/create-payment-intent`, {
      payment_method_types: ["card"],
      amount: this.props.cartList.reduce((accum, item) => {
        return accum += parseFloat(item.subtotal)
      }, 0),
      shipping: this.state
      })
      .then(res => {
      this.props.stripe
        .handleCardPayment(res.data.client_secret)
      })
      .then(() => {
      this.props.postOrder({ userId: this.props.user.id, cart: this.props.cartList })
      .then(() => this.props.deleteCart(this.props.user.id))
      .then(() => {
        if(this.props.statusMessage.status === SUCCESS) {
          this.props.history.push('/receipt');
        }
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
      },
      errors
    } = this.state;
    return (
      <div className='container mt-4'>
      {
      this.state.cardReady
      ? (
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
              <Form 
                style={
                  {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }
                }
              >
                <h3>Checkout for { this.props.user.firstName || 'Guest' }</h3>
                <h5>Shipping Information</h5>
                <div
                  style={
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      width: '50%',
                      margin: '1rem',
                    }
                  }
                >
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
                <div
                  style={
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      width: '50%',
                      margin: '1rem',
                    }
                  }
                >
                  <label>
                    Address
                  </label>
                  <input
                    type='text'
                    name='line1'
                    value={ line1 }
                    onChange={ this.handleOnChange }
                  />
                </div>
                <div 
                  style={
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      width: '50%',
                    }
                  }
                >
                  <label>
                    City
                  </label>
                  <input
                    type='text'
                    name='city'
                    value={ city }
                    onChange={ this.handleOnChange }
                  />
                </div>
                <div
                  style={
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      width: '50%',
                      margin: '1rem',
                    }
                  }
                >
                  <label>
                    Zip Code
                  </label>
                  <input
                    type='text'
                    name='postal_code'
                    value={ postal_code }
                    onChange={ this.handleOnChange }
                  />
                </div>
                <div
                  style={
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      width: '50%',
                    }
                  }
                >
                  <label>
                    State
                  </label>
                  <input
                    type='text'
                    name='state'
                    value={ state }
                    onChange={ this.handleOnChange }
                  />
                </div>
                <div 
                  style={
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      width: '50%',
                      margin: '1rem',
                    }
                  }
                >
                  <label>
                    Country 
                  </label>
                  <input
                    type='text'
                    name='country'
                    value={ country }
                    onChange={ this.handleOnChange }
                  />
                </div>
                <h5>Card Information</h5>
                <label>
                  Card details
                    <CardNumberElement />
                </label>
                <div
                  style={
                    {
                      display: 'flex',
                      margin: '1rem',
                    }
                  }
                >
                  <label>
                    Expiration date
                    <CardExpiryElement />
                  </label>
                  <label>
                    CVC 
                    <CardCVCElement />
                  </label>
                </div>
                <Button
                  style={
                    {
                      margin: '1rem',
                      backgroundColor: 'black',
                      border: 'none',
                      borderRadius: '0',
                      width: '300px'
                    }
                  }
                  onClick={ this.handleOnClick }
                  className='order-button'
                  disabled={
                    Object.values(errors).every(value => value === '') &&
                    Object.values(this.state.address).every(value => value !== '') &&
                    name !== ''
                    ? false
                    : true
                  }
                >
                  Pay {this.props.cartList.reduce((accum, item) => {
                    console.log(item)
                    return accum += parseFloat(item.subtotal)
                  }, 0)
                  }
                </Button>
             </Form>
           </div>
          )
        }
      </div>
      )
      : (
        <Loading message='loading credit card input' />
      )
      }
    )
    </div>
    )
  }
}

const mapState = ({
  user,
  cart,
  cartList,
  statusMessage
}) => ({
  user,
  cart,
  cartList,
  statusMessage
});

const mapDispatch = dispatch => {
  return {
    postOrder: order => dispatch(postOrder(order)),
    deleteCart: id => dispatch(deleteCart(id)),
  }
}

export default connect(mapState, mapDispatch)(injectStripe(StripeCheckoutForm));