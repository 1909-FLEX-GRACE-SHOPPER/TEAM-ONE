import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem.js';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCart, removeItemFromCart } from '../redux/thunks/CartThunks.js';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart();
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
                {/* <CartItem key={product.id} product={product} /> */}
                {/* TODO: add link to single product page */}
                <div className='cart-item'>
                  <div>Product ID: {product.id}</div>
                  <div className='cart-item-quantity-edit'>
                    Quantity:
                    <input
                      type='number'
                      className='cart-item-quantity-select'
                      min='1'
                      value={product.productQuantity}
                    />
                  </div>
                  <div className='cart-item-subtotal'>Subtotal: </div>
                  {/* TODO: make remove button work! */}
                  <Button onClick={() => this.handleRemoveItem(product)}>
                    Remove
                  </Button>
                </div>
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
    fetchCart: () => dispatch(setCart()),
    removeItem: item => dispatch(removeItemFromCart(item))
  };
};

export default connect(mapState, mapDispatch)(ShoppingCart);
