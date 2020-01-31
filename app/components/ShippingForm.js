import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';

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
        showFormOnExistingCustomer: false,
      }
    }

  handleOnChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value })
  }

  handleOnCheck = () => {
    this.setState({ showFormOnExistingCustomer: !this.showFormOnExistingCustomer })
  }

  render() {
    const { shippingAddress, shippingCity, shippingState, shippingZip, shippingCountry, showFormOnExistingCustomer } = this.state;
    const { user } = this.props
    console.log('USERTYPE', this.props)
    return (
      <div> 
          {
      user.userType === 'Existing customer'
      ? <div>
          <p>{ user.shippingAddress }</p>
          <p>{ user.shippingCity }</p>
          <p>{ user.shippingState }</p>
          <p>{ user.shippingZip }</p>
          <p>HI!</p>
          <Check
            onChange={ this.handleOnCheck }
          />
          {
            showFormOnExistingCustomer
            ? <h3>Form component goes here</h3>
            : null
          }
        </div>
      : <div>
        <h4>Shipping Information</h4>
        <Group controlId='shippingAddress'>
          <Label>Address</Label>
          <Control
            name='shippingAddress'
            value={ shippingAddress }
            onChange={ this.handleOnChange }
          />
        </Group>

        <Row>
          <Group as={ Col } controlId='shippingCity'>
            <Label>City</Label>
            <Control
              name='shippingCity'
              value={ shippingCity }
              onChange={ this.handleOnChange }
            />
          </Group>

          <Group as={ Col } controlId='shippingState'>
            <Label>State</Label>
            <Control
              name='shippingState'
              value={ shippingState }
              onChange={ this.handleOnChange }
            />
          </Group>

          <Group as={ Col } controlId='shippingZip'>
            <Label>Zip</Label>
            <Control
              name='shippingZip'
              value={ shippingZip }
              onChange={ this.handleOnChange }
            />
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
      </div>
      }
    </div>
    )
  }
}

const mapState = ({ user }) => ({ user })

export default connect(mapState)(ShippingForm);