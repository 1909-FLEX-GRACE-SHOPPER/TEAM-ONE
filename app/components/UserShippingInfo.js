import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

class UserShippingInfo extends Component {
  handleConfirm = e => {
      e.preventDefault();
  }

  render() {
    const {
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip
    } = this.props

    const shipping = {
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip
    }

    return (
      <div>
        {
          (Object.keys(shipping).every(key => !shipping[key]))
          ? (
            null
          )
          : (
            <div>     
              <p>{ shippingAddress }</p>
              <p>{ shippingCity }, { shippingState } { shippingZip }</p>
              <Button href='/checkout/confirmation' onClick={ this.handleConfirm }>Confirm this address</Button>
            </div>
          )
        }
      </div>
    )
  }
}

const mapState = ({ user }) => ({ user })

export default connect(mapState)(UserShippingInfo)