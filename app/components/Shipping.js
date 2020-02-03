import React from 'react';
import { connect } from 'react-redux';
import UserShippingInfo from './UserShippingInfo'
import ShippingForm from './ShippingForm';

const Shipping = () => {
  return (
    <div>
      <UserShippingInfo />
      <ShippingForm />
    </div>
  )
};

const mapState = ({ user }) => ({ user })

export default connect(mapState)(Shipping);
