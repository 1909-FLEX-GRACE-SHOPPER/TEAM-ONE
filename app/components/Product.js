import React from "react";
import Card from "react-bootstrap/Card";

const Product = ({ product }) => {
  return (
    <Card>
      <Card.Header>
        <div>{product.productName}</div>
        <div>${product.unitPrice}</div>
      </Card.Header>
      <Card.Img variant="bottom" src={product.productImage} />
    </Card>
  );
};

export default Product;
