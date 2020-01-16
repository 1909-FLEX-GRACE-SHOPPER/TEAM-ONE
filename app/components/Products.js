import React from 'react';
import Product from './Product.js';

const Products = ({ products }) => {
  return (
    <div>
      {products.length === 0
        ? 'No products'
        : products.map(_product => (
            <Product key={`product-${_product.id}`} product={_product} />
          ))}
    </div>
  );
};

export default Products;
