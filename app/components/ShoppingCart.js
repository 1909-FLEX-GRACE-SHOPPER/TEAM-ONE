import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem.js';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCart, removeItemFromCart } from '../redux/thunks/CartThunks.js';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = { total: 0 };
  }
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId);
  }

  componentDidUpdate() {}

  handleRemoveItem = async item => {
    await this.props.removeItem(item);
  };

  render() {
    const { cart } = this.props;
    console.log(cart);
    // this.state.total = this.state.total + cart.map(item => parseInt(item.subtotal));
    if (!cart.length) {
      return (
        <div className='shopping-cart'>
          <h4>SHOPPING CART</h4>
          <p>Your cart is empty.</p>
        </div>
      );
    } else {
      return (
        <div className='shopping-cart'>
          <h4>SHOPPING CART</h4>
          <ListGroup className='shopping-cart-product-list'>
            {cart.map(item => (
              <ListGroup.Item key={item.id}>
                <CartItem key={item.id} item={item} />
                <Button onClick={() => this.handleRemoveItem(item)}>
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {/* TODO: reflect total cost */}
          <div>TOTAL: {this.state.total}</div>
          <Link to='/checkout'>CHECKOUT</Link>
        </div>
      );
    }
  }
}

const mapState = state => {
  const cart = state.cart;
  return { cart };
};

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(setCart(userId)),
    removeItem: item => dispatch(removeItemFromCart(item))
  };
};

export default connect(mapState, mapDispatch)(ShoppingCart);
