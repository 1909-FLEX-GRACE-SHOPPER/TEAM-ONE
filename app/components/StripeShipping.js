import React, { Component } from 'react';
import { connect } from 'react-redux';

class StripeShipping extends Component {
  handleOnClick = e => {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <button onClick={ this.handleOnClick }>Proceed to Billing</button>
      </div>
    )
  }
}

const mapState = ({ user }) => ({ user })

export default connect(mapState)(StripePayment)