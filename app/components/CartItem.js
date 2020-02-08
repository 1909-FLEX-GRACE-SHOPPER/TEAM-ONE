import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCartList } from '../redux/thunks/CartThunks';
import axios from 'axios';

class CartItem extends React.Component {
  handleEditQuantity = ev => {
    const { item } = this.props;
    const newQuantity = ev.target.value;
    const newSubtotal = item.product.unitPrice * newQuantity;
    const updatedCartItem = { ...item, newQuantity, newSubtotal };
    this.props.updateCartList(updatedCartItem);
  };

  render() {
    const {
      product: { productImage, productName },
      productQuantity,
      subtotal,
      productId
    } = this.props.item;
    return (
      <div className='cart-item'>
        <img className='cart-item-image' src={productImage} />
        <div className='cart-item-name'>
          <Link to={`/products/${productId}`}>{productName}</Link>
        </div>
        <div className='cart-item-quantity-edit'>
          Quantity:
          <input
            type='number'
            className='cart-item-quantity-select'
            min='1'
            value={productQuantity}
            onChange={ev => this.handleEditQuantity(ev)}
          />
        </div>
        <div className='cart-item-subtotal'>Subtotal: {`$${subtotal}`} </div>
      </div>
    );
  }
}

const mapState = ({ cartList }) => ({ cartList });
const mapDispatch = dispatch => {
  return {
    updateCartList: cartItem => dispatch(updateCartList(cartItem))
  };
};

export default connect(mapState, mapDispatch)(CartItem);
