import React from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';
import axios from 'axios';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productImage: this.props.product.productImage,
      productName: this.props.product.productName,
      cartId: this.props.product.id,
      quantity: this.props.product.productQuantity,
      //TODO: remove product ID when product name can be rendered
      productId: this.props.product.productId
    };
  }

  handleEditQuantity = async ev => {
    try {
      const newQuantity = ev.target.value;
      this.setState({ quantity: newQuantity });
      await axios
        .put(`/api/users/cart/${this.state.cartId}`, { newQuantity })
        .then(res => {
          return res.data;
        });
    } catch (err) {
      err => console.log(err);
    }
  };

  render() {
    const { productImage, productName, quantity, productId } = this.state;
    return (
      <div className='cart-item'>
        <img className='cart-item-image' src={productImage} />
        <div className='cart-item-name'>
          <Link to={`/products/${productId}`}>{productName}</Link>
        </div>
        {/* //TODO: remove product ID when product name can be rendered */}
        <div className='cart-item-id'>Product ID: {productId}</div>
        <div className='cart-item-quantity-edit'>
          Quantity:
          <input
            type='number'
            className='cart-item-quantity-select'
            min='1'
            value={quantity}
            onChange={ev => this.handleEditQuantity(ev)}
          />
        </div>
        <div className='cart-item-subtotal'>Subtotal: </div>
      </div>
    );
  }
}

export default CartItem;
