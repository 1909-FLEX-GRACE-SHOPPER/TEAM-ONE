import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productImage: '',
      productName: '',
      price: '',
      subtotal: this.props.item.subtotal,
      cartListId: this.props.item.id,
      quantity: this.props.item.productQuantity,
      userId: this.props.item.userId,
      productId: this.props.item.productId
    };
  }

  componentDidMount() {
    try {
      const { productId } = this.state;
      axios
        .get(`/api/products/${productId}`)
        .then(res => res.data)
        .then(product => {
          this.setState({
            productImage: product.productImage,
            productName: product.productName,
            price: product.unitPrice
          });
        });
    } catch (err) {
      err => console.log(err);
    }
  }

  handleEditQuantity = async ev => {
    try {
      const newQuantity = ev.target.value;
      const newSubtotal = this.state.price * newQuantity;
      this.setState({
        quantity: newQuantity,
        subtotal: newSubtotal
      });
      await axios
        .put(`/api/users/${this.state.userId}/cart/${this.state.cartListId}`, {
          newQuantity
          // newSubtotal
        })
        .then(res => {
          return res.data;
        });
    } catch (err) {
      err => console.log(err);
    }
  };

  render() {
    const {
      productImage,
      productName,
      quantity,
      price,
      productId
    } = this.state;
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
            value={quantity}
            onChange={ev => this.handleEditQuantity(ev)}
          />
        </div>
        <div className='cart-item-subtotal'>
          Subtotal: {`$${(price * quantity).toFixed(2)}`}{' '}
        </div>
      </div>
    );
  }
}

export default CartItem;
