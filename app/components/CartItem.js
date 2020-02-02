import React from 'react';
import { Button } from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Product from './Product';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // productImage: this.props.product.productImage,
      // productName: this.props.product.productName,
      quantity: this.props.product.productQuantity,
      productId: this.props.product.productId
    };
  }

  render() {
    const { productImage, productName, quantity, productId } = this.state;
    console.log(quantity);
    return (
      <div className='cart-item'>
        product
        {/* <img className='cart-item-image' src={productImage} /> */}
        {/* <div className='cart-item-name'>{productName}</div> */}
        <div className='cart-item-id'>{productId}</div>
        <div className='cart-item-quantity-edit'>
          {/* TODO: create an edit form */}
          <div className='cart-item-quantity'>Quantity: {quantity}</div>
          <Button>Edit</Button>
        </div>
        <div className='cart-item-subtotal'>Subtotal: </div>
        {/* TODO: create remove function */}
        <Button>Remove</Button>
      </div>
    );
  }
}

export default CartItem;
