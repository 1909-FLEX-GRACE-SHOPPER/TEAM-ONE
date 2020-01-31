import React, { Component } from 'react';

class BillingForm extends Component {
  constructor() {
    super();
    this.state = {
      billingAddress: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
    }
  }

  render() {
    return (
      <div>
        <p>Billing Form</p>
      </div>
    )
  }
}

export default BillingForm