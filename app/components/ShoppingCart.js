import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem.js';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCart } from '../redux/thunks/CartThunks';

class ShoppingCart extends React.Component {
  componentDidMount() {
    this.props.fetchCart();
  }

  render() {
    const { cart } = this.props;
    console.log('cart' + cart);
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
                Quantity: {product.productQuantity}
              </ListGroup.Item>
            ))}
          </ListGroup>
          {/* TODO: reflect total cost */}
          <div>TOTAL: </div>
          {/* TODO: add link to Checkout component */}
          <Button>CHECKOUT</Button>
          {/* TODO: add link to single product page */}
          {/* <Link>BACK</Link> */}
        </div>
      );
    }
  }
}

const mapState = ({ cart }) => {
  {
    cart;
  }
};

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  };
};

export default connect(mapState, mapDispatch)(ShoppingCart);
