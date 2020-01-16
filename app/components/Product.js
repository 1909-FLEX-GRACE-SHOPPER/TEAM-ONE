import React from 'react';
import Card from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card>
      <Card.Header>
        <div>{product.name}</div>
        <div>${product.price}</div>
      </Card.Header>
      <Card.Img variant="bottom" src={product.image} />
    </Card>
  );
};

export default Product;
