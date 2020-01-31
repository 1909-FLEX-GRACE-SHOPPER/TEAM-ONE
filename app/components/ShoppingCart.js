import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem.js";
import Button from "react-bootstrap/Button";

const ShoppingCart = () => {
  return (
    <div className="shopping-cart">
      <div>SHOPPING CART</div>
      <div>TOTAL</div>
      <Button>CHECKOUT</Button>
    </div>
  );
};

export default ShoppingCart;
