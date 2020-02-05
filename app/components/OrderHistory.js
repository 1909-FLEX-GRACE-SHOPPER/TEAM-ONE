import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchSingleProduct,
  fetchSimilarProducts
} from '../redux/thunks/ProductThunks';
import { postWishlist } from '../redux/thunks/WishlistThunks';
import Product from './Product';
import Button from 'react-bootstrap/Button';

class OrderHistory extends Component {
  render(){
    return(
      <div> Order History </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    orderHistory: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: userId => dispatch(fetchOrders(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
