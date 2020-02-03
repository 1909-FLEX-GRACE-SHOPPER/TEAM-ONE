import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
const { Row, Group, Col, Control, Label } = Form;
import Button from 'react-bootstrap/Button';
import { setUser } from '../redux/actions'

class BillingForm extends Component {
  constructor() {
    super();
    this.state = {
      cardHolder: '',
      cardNumber: '',
      securityCode: '',
      expirationDate: '',
      billingAddress: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
      billingCountry: '',
      errors: {
        cardHolderError: '',
        cardNumberError: '',
        securityCodeError: '',
        expirationDateError: '',
        billingAddressError: '',
        billingCityError: '',
        billingStateError: '',
        billingZipError: '',
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

      case 'billingAddress':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              billingAddressError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              errors,
              billingAddressError: ''
            }
          })
        }
        break;
      case 'billingCity':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              billingCityError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              billingCityError: ''
            }
          })
        }
        break;

      case 'billingState':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              billingStateError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              billingStateError: ''
            }
          })
        }
        break;

      case 'billingZip': 
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              billingZipError: 'Required field'
            }
          })
        } else if(!value.match(/^[0-9]{5}/)) {
          this.setState({
            errors: {
              ...errors,
              billingZipError: 'Invalid zip code'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              billingZipError: ''
            }
          })
        }
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
    this.props.setUser({ ...this.props.user, billing: { ...this.state } })
    this.props.history.push('/checkout/shipping');
  }

  render() {
    const {
      billingAddress,
      billingCity,
      billingState,
      billingZip,
      billingCountry,
      cardHolder,
      cardNumber,
      securityCode,
      expirationDate,
      errors: {
        cardHolderError,
        cardNumberError,
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
          <Control.Feedback type='invalid' className='text-danger'>{ cardHolderError }</Control.Feedback>
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
            />
          </Group>

          <Group controlId='expirationDate'>
            <Label>Expiration Date</Label>
            <Control
              name='expirationDate'
              value={ expirationDate }
              onChange={ this.handleOnChange }
            />
          </Group>
        </Row>

        <Group controlId='billingAddress'>
          <Label>Address</Label>
          <Control
            name='billingAddress'
            value={ billingAddress }
            onChange={ this.handleOnChange }
          />
        </Group>

        <Row>
          <Group as={ Col } controlId='billingCity'>
            <Label>City</Label>
            <Control
              name='billingCity'
              value={ billingCity }
              onChange={ this.handleOnChange }
            />
          </Group>

          <Group as={ Col } controlId='billingState'>
            <Label>State</Label>
            <Control
              name='billingState'
              value={ billingState }
              onChange={ this.handleOnChange }
            />
          </Group>

          <Group as={ Col } controlId='billingZip'>
            <Label>Zip</Label>
            <Control
              name='billingZip'
              value={ billingZip }
              onChange={ this.handleOnChange }
            />
          </Group>

          <Group as={ Col } controlId='billingCountry'>
            <Label>Country</Label>
            <Control
              name='billingCountry'
              value={ billingCountry }
              onChange={ this.handleOnChange }
            />
          </Group>
        </Row>

        <Button onClick={ this.handleOnClick }>Proceed to Shipping</Button>
      </div>
    )
  }
}

const mapState = ({ user }) => ({ user })

const mapDispatch = dispatch => {
  return {
    setUser: state => dispatch(setUser(state))
  }
}

export default connect(mapState, mapDispatch)(BillingForm)