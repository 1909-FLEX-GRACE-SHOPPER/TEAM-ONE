import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ConfirmationPlacard from './ConfirmationPlacard';

import { updateUser } from '../redux/thunks/UserThunks';
import { postOrder } from '../redux/thunks/OrderThunks';

class Confirmation extends Component {

  handleOnClick = e => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="confirmation-page">
        {/* <ConfirmationPlacard title={ 'Billing Information' } props={ this.props.user.billing } />
        <ConfirmationPlacard title={ 'Shipping Information' } props={ this.props.user.shipping } /> */}
        <Button onClick={ this.handleOnClick }>Confirm Order</Button>
      </div>
    );
  }
};

const mapState = ({ user }) => ({ user });

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, user) => dispatch(updateUser(userId, user)),
    postOrder: order => dispatch(postOrder(order))
  }
}

export default connect(mapState, mapDispatch)(Confirmation);
