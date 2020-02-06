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

import { fetchOrders } from '../redux/thunks/OrderThunks';

class UserPage extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchOrders(userId);
  }
  render() {
    // const { userOrders } = this.props;
    // // console.log('this isthe ', this.props.match.params.id)
    // console.log('this is the orderhistory', userOrders.orders);
    const { orderHistory } = this.props;
    //const { orders } = orderHistory; 

    console.log('this is the props orders', this.props);
    return !orderHistory ? (
      <div> You have no orders Bro </div>
    ) : (
      <div>
        {orderHistory.map(singleOrder => (
          <div> {singleOrder.totalCost}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orderhistory: state.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: userId => dispatch(fetchOrders(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
