import React from 'react';
import { connect } from 'react-redux';
import UserShippingInfo from './UserShippingInfo'
import ShippingForm from './ShippingForm';

const Shipping = ({ history }) => {
  return (
    <div>
      <UserShippingInfo />
      <ShippingForm history={ history }/>
    </div>
  )
};

const mapState = ({ user }) => ({ user })

export default connect(mapState)(Shipping);
