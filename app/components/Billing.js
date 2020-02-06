import React from 'react';
import { connect } from 'react-redux';
import UserBillingInfo from './UserBillingInfo';
import BillingForm from './BillingForm';

const Billing = ({ history }) => {
  return (
    <div>
      <UserBillingInfo />
      <BillingForm history={ history }/>
    </div>
  )
};

const mapState = ({ user }) => ({ user })

export default connect(mapState)(Billing);