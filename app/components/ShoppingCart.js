import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem.js';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCart, removeItemFromCart } from '../redux/thunks/CartThunks.js';

class ShoppingCart extends React.Component {
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId);
  }

  handleRemoveItem = async item => {
    await this.props.removeItem(item);
  };

  render() {
    const { cart } = this.props;
    if (cart.length === 0) {
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
            {cart.map(product => (
              <ListGroup.Item key={product.id}>
                <CartItem key={product.id} product={product} />
                <Button onClick={() => this.handleRemoveItem(product)}>
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {/* TODO: reflect total cost */}
          <div>TOTAL: </div>
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
