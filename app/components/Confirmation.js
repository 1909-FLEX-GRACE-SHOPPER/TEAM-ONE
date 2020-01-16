import React from "react";
import Shipping from "./Shipping.js";
import { Link } from "react-router-dom";
import Button from "react-bootstrap";

const Confirmation = ({ orderDetails }) => {
  return (
    <div className="confirmation-page">
      <div>CAR - PAYMENT - CONFIRMATION</div>
      <Link>BACK</Link>
      <div>Confirmation</div>
      <div>This is the billing confirmation</div>
      <Shipping />
      <div>FINAL CART INFO</div>
    </div>
  );
};

export default Confirmation;
