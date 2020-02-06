import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
const { Row, Group, Label, Control, Col } = Form;
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import { updateCart } from '../redux/thunks/CartThunks';

import { SUCCESS } from '../redux/thunks/utils';

class ShippingForm extends Component {
  constructor(history) {
    super(history);
      this.state = {
        shippingName: '',
        shippingAddress: '',
        shippingCity: '',
        shippingState: '',
        shippingZip: '',
        shippingCountry: '',
        shippingNotes: '',
        errors: {
          shippingNameError: '',
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
      case 'shippingName':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              shippingNameError: 'Required Field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              shippingNameError: ''
            }
          })
        }
        break;

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

      case 'shippingCountry':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              shippingCountryError: 'Required field',
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              shippingCountryError: '',
            }
          })
        }
      
      default:
        break;
    }
  }

  handleOnChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value }, () => this.validate(name, value))
  }

  handleOnClick = e => {
    e.preventDefault()
    this.props.updateCart( this.props.user.id, this.state )
    .then(() => {
      if(this.props.statusMessage.status === SUCCESS)
      this.props.history.push('/checkout/confirmation')
    })
  }

  render() {
    const {
      shippingName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      shippingCountry,
      shippingNotes,
      errors: {
        shippingNameError,
        shippingAddressError,
        shippingCityError,
        shippingStateError,
        shippingZipError,
        shippingCountryError,
      }
    } = this.state;

    return (
      <div>
        <h4>Shipping Information</h4>
        <Group controlId='name'>
          <Label>Name</Label>
          <Control
            name='shippingName'
            value={ this.props.cart.shippingName || shippingName }
            onChange={ this.handleOnChange }
            isInvalid={ !!shippingNameError }
          />
          <Control.Feedback
            type='invalid'
            className='text-danger'
          >
            { shippingNameError }
          </Control.Feedback>
        </Group>
        <Group controlId='shippingAddress'>
          <Label>Address</Label>
          <Control
            name='shippingAddress'
            value={ this.props.cart.shippingAddress || shippingAddress }
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
              value={ this.props.cart.shippingCity || shippingCity }
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
              value={ this.props.cart.shippingState || shippingState }
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
              value={ this.props.cart.shippingZip || shippingZip }
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
              value={ this.props.cart.shippingCountry || shippingCountry }
              onChange={ this.handleOnChange }
              isInvalid={ !!shippingCountryError }
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              { shippingCountryError }
            </Control.Feedback>
          </Group>
        </Row>

        <Group controlId='shippingNotes'>
          <Label>Shipping Notes</Label>
          <Control
            as='textarea'
            rows='4'
            name='shippingNotes'
            value={ this.props.cart.shippingNotes || shippingNotes }
            onChange={ this.handleOnChange }
            placeholder='Please leave by door, buzzer on right side, etc.'
          />
        </Group>
        <Button
          onClick={ this.handleOnClick }
          disabled={ 
              Object.values(this.state.errors).every(value => value === '') &&
              Object.keys(this.state).every(key => {
                if(key !== 'shippingNotes') {
                  return this.state[key] !== '';
                } else {
                  return true;
                }
              })
              ? false
              : true
         }
        >
          Proceed to Confirmation
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

export default connect(mapState, mapDispatch)(ShippingForm);