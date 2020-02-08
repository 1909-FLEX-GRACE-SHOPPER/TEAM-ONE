import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem.js';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import Loading from './Loading';
import {
  fetchCartList,
  removeItemFromCart
} from '../redux/thunks/CartThunks.js';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      fetchedCart: false
    };
  }
  componentDidMount() {
    console.log('calling componentDidMount in Cart');
    this.checkAndFetchCart();
  }
  componentDidUpdate() {
    console.log('calling componentDidUpdate in Cart');
    this.checkAndFetchCart();
  }

  handleRemoveItem = async item => {
    await this.props.removeItem(item);
  };

  checkAndFetchCart = () => {
    const { user, fetchCartList } = this.props;
    if (user.id && !this.state.fetchedCart) {
      console.log('fetching cart');
      fetchCartList(user.id);
      this.setState({ fetchedCart: true });
    }
  };

  render() {
    const { cartList, user } = this.props;
    let total = this.state.total;
    if (!user.id) return <Loading message='Retrieving your cart' />;
    cartList.map(item => {
      total += parseFloat(item.subtotal);
    });
    if (!cartList.length) {
      return (
        <div className='shopping-cart'>
          <Link to='/products/page/1'>Back</Link>
          <h4>SHOPPING CART</h4>
          <p>Your cart is empty.</p>
        </div>
      );
    } else {
      return (
        <div className='shopping-cart'>
          <Link to='/products/page/1'>Back</Link>
          <h4>SHOPPING CART</h4>
          <ListGroup className='shopping-cart-product-list'>
            {cartList.map(item => (
              <ListGroup.Item key={item.id}>
                <CartItem key={item.id} item={item} />
                <Button onClick={() => this.handleRemoveItem(item)}>
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {/* TODO: total cost should update when subtotal changes*/}
          <div>TOTAL: ${total}</div>
          <Link to='/checkout'>CHECKOUT</Link>
        </div>
      );
    }
  }
}

const mapState = state => {
  const cartList = state.cartList;
  const user = state.user;
  return { cartList, user };
};

const mapDispatch = dispatch => {
  return {
    fetchCartList: userId => dispatch(fetchCartList(userId)),
    removeItem: item => dispatch(removeItemFromCart(item))
  };
};

export default connect(mapState, mapDispatch)(ShoppingCart);
