import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import ShippingConfirmation from './ShippingConfirmation.js';
import BillingConfirmation from './BillingConfirmation.js';

import { deleteCart } from '../redux/thunks/CartThunks';
import { postOrder } from '../redux/thunks/OrderThunks';

class Confirmation extends Component {

  handleOnClick = e => {
    e.preventDefault();
    console.log(this.props.cart)
    this.props.postOrder(this.props.user.id, this.props.cart)
    this.props.deleteCart(this.props.user.id);
  }

  render() {
    return (
      <div className="confirmation-page">
        <BillingConfirmation />
        <ShippingConfirmation />
        <Button 
          onClick={ this.handleOnClick }
          disabled={
            Object.keys(this.props.cart).every(key => {
              if(key === 'shippingNotes'||
              key === 'shippingCountry' ||
              key === 'productId' ||
              key === 'productQuantity') {
                return true;
              } else {
                return !!this.props.cart[key]
              }
            })
            ? false
            : true
          }
        >
          Confirm Order
        </Button>
      </div>
    );
  }
};

const mapState = ({ user, cart }) => ({ user, cart });

const mapDispatch = dispatch => {
  return {
    deleteCart: userId => dispatch(deleteCart(userId)),
    postOrder: (userId, cart) => dispatch(postOrder(userId, cart))
  }
}

export default connect(mapState, mapDispatch)(Confirmation);
