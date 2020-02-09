import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import emoji from 'node-emoji';

import { addToCart } from '../redux/thunks/CartThunks';
import { postWishlist } from '../redux/thunks/WishlistThunks';

class Product extends Component {

  handleAddToCart = ({
    productId,
    cartId,
    productQuantity,
    userId,
    subtotal,
  }, e) => {
    e.preventDefault()
    this.props.addToCart(
      productId,
      cartId,
      productQuantity,
      userId,
      subtotal
    );
  };

  handleAddToWishlist = (productId, userId, e) => {
    e.preventDefault();
    this.props.postWishlist(
      productId,
      userId,
    )
  }

  render() {
  return (
    <div
      style={
        {
          width: 'calc(100%/4)',
          margin: '1rem',
          height: '450px',
          fontFamily: 'Roboto',
          padding: '0.5rem',
          border: '2px black solid',
        }
      }
    >
    <div
      style={
        {
          display: 'flex',
        }
      }
    >
      <Button
        style={
          {
            border: '2px solid black',
            borderRadius:'none',
            backgroundColor: 'white',
            margin: '0.5rem',
          }
        }
        onClick={e => {
          this.handleAddToCart({
            productId: this.props.product.id,
            cartId: this.props.cart.id,
            productQuantity: 1,
            userId: this.props.user.id,
            subtotal: this.props.product.unitPrice
          }, e)
        }}
      >
        {emoji.get('heavy_plus_sign')}
      </Button>
      { this.props.user.userType === 'Existing customer'
      ? (
        <Button
          style={
            {
              border: '2px solid black',
              borderRadius:'none',
              backgroundColor: 'white',
              margin: '0.5rem',
            }
          }
          onClick={e => {
            this.handleAddToWishlist(
              this.props.product.id,
              this.props.user.id,
              e)
          }}
        >
          {emoji.get('heart')}
        </Button>
      )
      : null
    }
    </div>
      <Link to={`/products/${this.props.product.id}`}
        style={
          {
            textDecoration: 'none',
            color: 'black',
          }
        }
      >
        <div>
          <div>
            <img
              variant='bottom'
              src={this.props.product.productImage}
              style={
                {
                  width: '100%'
                }
              }
            />
          </div>
          <div
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '1rem',
              }
            }
          >
            <div
              style={
                {
                  fontSize: '14px',
                  textTransform: 'uppercase',
                }
              }>{this.props.product.productName}</div>
            <div 
              style={
                {
                  fontSize: '14px',
                }
              }
            >${this.props.product.unitPrice}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
}

const mapState = ({ user, singleProduct, cart }) => ({ user, singleProduct, cart })

const mapDispatch = dispatch => {
  return {
    addToCart: (productId, cartId, productQuantity, userId, subtotal) => dispatch(addToCart(productId, cartId, productQuantity, userId, subtotal)),
    postWishlist: (productId, userId) => dispatch(postWishlist(productId, userId))
  }
}

export default connect(mapState, mapDispatch)(Product);
