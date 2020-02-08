import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem.js';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import Loading from './Loading';
import { setCartList, removeItemFromCart } from '../redux/thunks/CartThunks.js';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      fetchedCart: false
    };
  }
  componentDidMount() {
    this.checkAndFetchCart();
  }
  componentDidUpdate() {
    this.checkAndFetchCart();
  }

  //TO DO: update user Id in CartList when user log in or log out
  handleRemoveItem = async item => {
    await this.props.removeItem(item);
  };

  checkAndFetchCart = () => {
    const { user, fetchCart } = this.props;
    if (user.id && !this.state.fetchedCart) {
      fetchCart(user.id);
      this.setState({ fetchedCart: true });
    }
  };

  render() {
    const { cartList, user } = this.props;
    let total = this.state.total;
    console.log('calling ShoppingCart render');
    if (!user.id) return <Loading message="Retrieving your cart" />;
    cartList.map(item => {
      total += parseFloat(item.subtotal) / 2;
      //Math.round((total + Number.EPSILON) * 100) / 100;
    });
    if (!cartList.length) {
      return (
        <div className="shopping-cart">
          <Link to="/products/page/1">Back</Link>
          <h4>SHOPPING CART</h4>
          <p>Your cart is empty.</p>
        </div>
      );
    } else {
      return (
        <div className="shopping-cart">
          <Link to="/products/page/1">Back</Link>
          <h4>SHOPPING CART</h4>
          <ListGroup className="shopping-cart-product-list">
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
          <Link to="/checkout">CHECKOUT</Link>
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
