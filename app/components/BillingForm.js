import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
const { Row, Group, Col, Control, Label } = Form;
import Button from 'react-bootstrap/Button';
import { updateCart } from '../redux/thunks/CartThunks';

import { SUCCESS } from '../redux/thunks/utils';

class BillingForm extends Component {
  constructor() {
    super();
    this.state = {
      cardHolder: '',
      cardNumber: '',
      securityCode: '',
      expirationDate: '',
      errors: {
        cardHolderError: '',
        cardNumberError: '',
        securityCodeError: '',
        expirationDateError: '',
      }
    }
  }

  validate = (field, value) => {
    const { errors } = this.state;

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

      case 'expirationDate':
        break;

      default:
        break;
    }
  }

  handleOnChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value }, () => this.validate(name, value))
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
      expirationDate,
      errors: {
        cardHolderError,
        cardNumberError,
        securityCodeError,
        expirationDateError,
      }
    } = this.state
    return (
      <div>
        <h3>Billing Information</h3>
        <Group controlId='cardHolder'>
          <Label>Name as it appears on Card</Label>
          <Control
            name='cardHolder'
            value={ cardHolder }
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
              value={ cardNumber }
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

          <Group controlId='expirationDate'>
            <Label>Expiration Date</Label>
            <Control
              name='expirationDate'
              value={ expirationDate }
              onChange={ this.handleOnChange }
              isInvalid={ !!expirationDateError }
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              { expirationDateError }
            </Control.Feedback>
          </Group>
        </Row>

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

const mapState = ({ user, statusMessage }) => ({ user, statusMessage })

const mapDispatch = dispatch => {
  return {
    updateCart: (userId, state) => dispatch(updateCart(userId, state))
  }
}

export default connect(mapState, mapDispatch)(BillingForm)