import React from 'react';
import { connect } from 'react-redux';
import UserShippingInfo from './UserShippingInfo'
import ShippingForm from './ShippingForm';

const Shipping = props => {
  return (
    <div>
      <UserShippingInfo />
      <ShippingForm props={ props }/>
    </div>
  )
};

const mapState = ({ user }) => ({ user })

export default connect(mapState)(Shipping);
