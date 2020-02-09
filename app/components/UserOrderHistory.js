import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchSingleProduct,
  fetchSimilarProducts
} from '../redux/thunks/ProductThunks';
import { postWishlist } from '../redux/thunks/WishlistThunks';
import Product from './Product';
import Button from 'react-bootstrap/Button';
import { fetchOrders, fetchOrderDetails } from '../redux/thunks/OrderThunks';

class UserOrderHistory extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchOrders(userId)
  
  }
  render() {
    const { orders , orderDetails} = this.props;
    return (
      <div> 
      
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders, 
    orderDetails: state.orderDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: user=> dispatch(fetchOrders(user)), 
    fetchOrderDetails: orderId => dispatch(fetchOrderDetails(orderId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderHistory);