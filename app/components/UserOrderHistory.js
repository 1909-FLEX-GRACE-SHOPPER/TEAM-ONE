import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrderDetails } from '../redux/thunks/OrderDetailsThunks';
import Loading from './Loading';

class UserOrderHistory extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchOrderDetails(userId);
  }
  render() {
    const { orderDetails } = this.props;
    console.log(this.props.orderDetails);
    if (orderDetails.length === 0)
      return <Loading message="Retrieving your orders" />;
    return (
      <div>
        {orderDetails.map(_order => (
          <div key={`order-${_order.id}`}>
            {_order.orderDetails.map(_detail => (
              <div key={`detail-${_detail.id}`}>{`Product ID: ${
                _detail.productId
              }; $${_detail.productCost}; Ordered at ${new Date(
                _detail.createdAt
              )
                .toString()
                .slice(0, 15)}`}</div>
            ))}
          </div>
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
