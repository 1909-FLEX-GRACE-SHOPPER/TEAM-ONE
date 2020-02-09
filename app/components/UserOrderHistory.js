import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrderDetails } from '../redux/thunks/OrderDetailsThunks';

class UserOrderHistory extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchOrders(userId);
  }
  render() {
    const { orderDetails } = this.props;
    return (
      <div>
        {orderDetails.map(_order => (
          <div>{JSON.stringify(_order)}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orderDetails: state.orderDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrderDetails: userId => dispatch(fetchOrderDetails(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderHistory);
