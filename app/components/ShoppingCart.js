import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem.js';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCartList, removeItemFromCart } from '../redux/thunks/CartThunks.js';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = { total: 0 };
  }
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId);
  }
  //TO DO: update user Id in CartList when user log in or log out
  handleRemoveItem = async item => {
    await this.props.removeItem(item);
  };

  render() {
    const { cartList } = this.props;
    console.log('calling ShoppingCart render');
    cartList.map(item => {
      this.state.total += parseFloat(item.subtotal) / 2;
      Math.round((this.state.total + Number.EPSILON) * 100) / 100;
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
          {/* TODO: reflect total cost */}
          <div>TOTAL: ${this.state.total}</div>
          <Link to='/checkout'>CHECKOUT</Link>
        </div>
      );
    }
  }
}

const mapState = state => {
  const cartList = state.cartList;
  return { cartList };
};

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(setCartList(userId)),
    removeItem: item => dispatch(removeItemFromCart(item))
  };
};

export default connect(mapState, mapDispatch)(ShoppingCart);
