import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class WishlistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.item.productId,
      productName: '',
      productImage: '',
      price: ''
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
      console.log(err);
    }
  }

  render() {
    const { productName, productImage, price, productId } = this.state;
    return (
      <div>
        <img className='wishlist-item-image' src={productImage} />
        <div className='wishlist-item-name'>
          <Link to={`/products/${productId}`}>{productName}</Link>
        </div>
        <div className='wishlist-item-price'>Price: {price}</div>
      </div>
    );
  }
}

export default WishlistItem;
