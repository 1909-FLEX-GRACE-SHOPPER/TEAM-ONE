import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
const { Row, Group, Col, Control, Label } = Form;
import Button from 'react-bootstrap/Button';

import { updateCart } from '../redux/thunks/CartThunks';

import { SUCCESS } from '../redux/thunks/utils';

class BillingForm extends Component {
  constructor(history) {
    super(history);
    this.state = {
      cardHolder: '',
      cardNumber: '',
      securityCode: '',
      expirationDate: {
        month: '',
        year: '',
      },
      errors: {
        cardHolderError: '',
        cardNumberError: '',
        securityCodeError: '',
        expirationDateError: '',
      }
    }
  }

  validate = (field, value) => {
    const { expirationDate, errors } = this.state;

    const expirationMonth = parseInt(expirationDate.month)
    const currentMonth = parseInt(moment().format('MM'))
    const expirationYear = parseInt(expirationDate.year)
    const currentYear = parseInt(moment().format('YY'))

    switch(field) {
      case 'cardHolder':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              cardHolderError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              cardHolderError: ''
            }
          })
        }
        break;

      case 'cardNumber':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              cardNumberError: 'Required field'
            }
          })
        } else if(!value.match(/^[0-9]{13,16}$/)) {
          this.setState({
            errors: {
              ...errors, 
              cardNumberError: 'Invalid card number'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              cardNumberError: ''
            }
          })
        }
        break;

      case 'securityCode':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              securityCodeError: 'Required field'
            }
          })
        } else if(!value.match(/^[0-9]{3}$/)) {
          this.setState({
            errors: {
              ...errors,
              securityCodeError: 'Invalid security code'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              securityCodeError: ''
            }
          })
        }
        break;

      case 'month':
        if(expirationYear < currentYear ||
          (expirationYear == currentYear &&
            expirationMonth < currentMonth)) {
              this.setState({
                errors: {
                  ...errors,
                  expirationDateError: 'Invalid Date',
                }
              })
          } else {
            this.setState({
              errors: {
                ...errors,
                expirationDateError: '',
              }
            })
          }
        break;

        case 'year':
        if(expirationYear < currentYear ||
          (expirationYear == currentYear &&
            expirationMonth < currentMonth)) {
              this.setState({
                errors: {
                  ...errors,
                  expirationDateError: 'Invalid Date',
                }
              })
          } else {
            this.setState({
              errors: {
                ...errors,
                expirationDateError: '',
              }
            })
          }
        break;

      default:
        break;
    }
  }

  handleOnChange = ({ target: { name, value }}) => {
    if(name === 'month' || name === 'year') {
      this.setState({
        expirationDate: {
          ...this.state.expirationDate,
          [name]: value,
        },
      }, () => this.validate(name,value))
    } else {
      this.setState({ [name]: value }, () => this.validate(name, value))
    }
  }

  handleOnClick = e => {
    e.preventDefault();
    this.props.updateCart(this.props.user.id , this.state)
    .then(() => {
      if(this.props.statusMessage.status === SUCCESS) {
        this.props.history.push('/checkout/shipping')
      }
    })
  }

  render() {
    const {
      cardHolder,
      cardNumber,
      securityCode,
      expirationDate: {
        month,
        year,
      },
      errors: {
        cardHolderError,
        cardNumberError,
        securityCodeError,
        expirationDateError,
      }
    } = this.state

    const currentYear = parseInt(moment().format('YY'))

    return (
      <div>
        <h3>Billing Information</h3>
        <Group controlId='cardHolder'>
          <Label>Name as it appears on Card</Label>
          <Control
            name='cardHolder'
            value={ this.props.cart.cardHolder || cardHolder }
            onChange={ this.handleOnChange }
            isInvalid={ !!cardHolderError }
          />
          <Control.Feedback
            type='invalid'
            className='text-danger'
          >
            { cardHolderError }
          </Control.Feedback>
        </Group>
        
        <Row 
          style={
            {
              display: 'flex'
            }
          }
        >
          <Group
            as={ Col }
            controlId='cardNumber'
            style={
              {
                flexGrow: '3'
              }
            }
          >
            <Label>Credit Card Number</Label>
            <Control
              name='cardNumber'
              value={ this.props.cart. cardNumber || cardNumber }
              onChange={ this.handleOnChange }
              isInvalid={ !!cardNumberError }
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              { cardNumberError }
            </Control.Feedback>
          </Group>

          <Group controlId='securityCode'>
            <Label>Security Code</Label>
            <Control
              name='securityCode'
              value={ securityCode }
              onChange={ this.handleOnChange }
              isInvalid={ !!securityCodeError }
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              { securityCodeError }
            </Control.Feedback>
          </Group>
        </Row>

        <Group 
          controlId='expirationDate'
          style={
            {
              display: 'flex',
            }
          }
        >
          <Label>Expiration Date</Label>
          <Control
            as='select'
            name='month'
            value={ month }
            onChange={ this.handleOnChange }
            isInvalid={ !!expirationDateError }
          >
          <option value='MM'>None</option>
            {
              new Array(12).fill('').map((item, idx) => {
                return (
                  <option
                    key={ idx }
                    value={
                      idx + 1 < 10 
                      ? `0${ idx + 1}`
                      : `${ idx + 1 }`
                    }
                  >
                    {
                      idx + 1 < 10 
                        ? `0${ idx + 1}`
                        : `${ idx + 1 }`
                    }        
                  </option>
                )
              })
            }
          </Control>
          /
          <Control
            as='select'
            name='year'
            value={ year }
            onChange={ this.handleOnChange }
            isInvalid={ !!expirationDateError }
          >
          <option value='YY'>None</option>
            {
              new Array(5).fill('').map((item, idx) => {
                return (
                  <option
                    key={ idx }
                    value = {
                      currentYear + idx < 10 
                      ? `0${ currentYear + idx }`
                      : `${ currentYear + idx }`
                    }
                  >
                    {
                      currentYear + idx < 10 
                      ? `0${ currentYear + idx }`
                      : `${ currentYear + idx }`
                    }
                  </option>
                )
              })
            } 
          </Control>
          <Control.Feedback
            type='invalid'
            className='danger-text'
          >
            { expirationDateError }
          </Control.Feedback>
        </Group>

        <Button
          onClick={ this.handleOnClick }
          disabled={
            Object.values(this.state.errors).every(value => value === '') &&
            Object.values(this.state).every(value => value !== '')
            ? false
            : true
          }
        >
          Proceed to Shipping
        </Button>
      </div>
    )
  }
}

const mapState = ({ user, cart, statusMessage }) => ({ user, cart, statusMessage })

const mapDispatch = dispatch => {
  return {
    updateCart: (userId, state) => dispatch(updateCart(userId, state))
  }
}

export default connect(mapState, mapDispatch)(BillingForm)