import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap';
import Product from './Product.js';

const ProductPage = ({ product, similarProducts }) => {
  return (
    <div>
      <Link>Back</Link>
      <div className="product-page">
        <div className="product-hero">
          <div className="product-image-large"></div>
          <div className="product-details">
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price}</div>
            <div className="product-quantity-select-container">
              <input type="number" className="product-quantity-select" />
              <div className="product-sub-total">SUBTOTAL</div>
            </div>
            <Button>ADD TO CART</Button>
            <Button>ADD TO WISHLIST</Button>
            <div className="product-description">{product.description}</div>
            <div className="social-media-icons">
              <div>TWITTER</div>
              <div>INSTAGRAM</div>
              <div>FACEBOOK</div>
            </div>
          </div>
        </div>
        <div className="similar-products-container">
          {similarProducts.map(_sp => (
            <Product key={`product-${_sp.id}`} product={_sp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
