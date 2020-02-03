import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <Card>
        <Card.Header>
          <div>{product.productName}</div>
          <div>${product.unitPrice}</div>
        </Card.Header>
        <Card.Img
          variant='bottom'
          className='product-image-small'
          src={product.productImage}
        />
      </Card>
    </Link>
  );
};

export default Product;
