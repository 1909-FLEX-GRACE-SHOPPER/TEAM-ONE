import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import { setUser } from '../redux/actions';

const { Row, Group, Label, Control, Col, Check } = Form;

class ShippingForm extends Component {
  constructor() {
    super();
      this.state = {
        shippingAddress: '',
        shippingCity: '',
        shippingState: '',
        shippingZip: '',
        shippingCountry: '',
        errors: {
          shippingAddressError: '',
          shippingCityError: '',
          shippingStateError: '',
          shippingZipError: '',
          shippingCountryError: '',
        }
      }
    }

  validate = (field, value) => {
    const { errors } = this.state
    switch(field) {
      case 'shippingAddress':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              shippingAddressError: 'Required Field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              shippingAddressError: ''
            }
          })
        }
        break;

      case 'shippingCity':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              shippingCityError: 'Required Field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              shippingCityError: ''
            }
          })
        }
        break;

      case 'shippingState': 
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              shippingStateError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              shippingStateError: ''
            }
          })
        }
        break;
      
      case 'shippingZip':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              shippingZipError: 'Required field'
            }
          })
        } else if(!value.match(/^[0-9]{5}$/)) {
          this.setState({
            errors: {
              ...errors,
              shippingZipError: 'Invalid Zip Code'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              shippingZipError: ''
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
    this.props.setUser({ ...this.props.user, shipping: { ...this.state } })
  }

  render() {
    const {
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      shippingCountry,
      errors: {
        shippingAddressError,
        shippingCityError,
        shippingStateError,
        shippingZipError,
      }
    } = this.state;

    return (
      <div>
        <h4>Shipping Information</h4>
        <Group controlId='shippingAddress'>
          <Label>Address</Label>
          <Control
            name='shippingAddress'
            value={ shippingAddress }
            onChange={ this.handleOnChange }
            isInvalid={ !!shippingAddressError }
          />
          <Control.Feedback
            type='invalid'
            className='text-danger'
          >
            { shippingAddressError }
          </Control.Feedback>
        </Group>

        <Row>
          <Group as={ Col } controlId='shippingCity'>
            <Label>City</Label>
            <Control
              name='shippingCity'
              value={ shippingCity }
              onChange={ this.handleOnChange }
              isInvalid={ !!shippingCityError }
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              { shippingCityError }
            </Control.Feedback>
          </Group>

          <Group as={ Col } controlId='shippingState'>
            <Label>State</Label>
            <Control
              name='shippingState'
              value={ shippingState }
              onChange={ this.handleOnChange }
              isInvalid={ !!shippingStateError }
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              { shippingStateError }
            </Control.Feedback>
          </Group>

          <Group as={ Col } controlId='shippingZip'>
            <Label>Zip</Label>
            <Control
              name='shippingZip'
              value={ shippingZip }
              onChange={ this.handleOnChange }
              isInvalid={ !!shippingZipError }
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              { shippingZipError }
            </Control.Feedback>
          </Group>

          <Group as={ Col } controlId='shippingCountry'>
            <Label>Country</Label>
            <Control
              name='shippingCountry'
              value={ shippingCountry }
              onChange={ this.handleOnChange }
            />
          </Group>
        </Row>
        <Button href='/checkout/confirmation' onClick={ this.handleOnClick } disabled={ true }>Proceed to Confirmation</Button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    setUser: state => dispatch(setUser(state))
  }
}

export default connect(null, mapDispatch)(ShippingForm);