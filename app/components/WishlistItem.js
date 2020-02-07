import React from 'react';
import { Link } from 'react-router-dom';

class WishlistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.item.productId,
      productName: this.props.product.productName,
      productImage: this.props.product.productImage,
      productPrice: this.props.product.unitPrice
    };
  }

  render() {
    const { productName, productImage, productPrice, productId } = this.state;
    return (
      <div>
        <img className='wishlist-item-image' src={productImage} />
        <div className='wishlist-item-name'>
          <Link to={`/products/${productId}`}>{productName}</Link>
        </div>
        <div className='wishlist-item-price'>Product Price: {productPrice}</div>
        {/* TODO: remove product ID wwhen product name can be rendered */}
        <div className='wishlist-item-id'>Product ID: {productId}</div>
      </div>
    );
  }
}

export default WishlistItem;
