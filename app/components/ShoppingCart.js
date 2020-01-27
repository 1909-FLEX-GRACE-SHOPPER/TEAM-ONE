import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem.js";
import Button from "react-bootstrap";

// const ShoppingCart = ({ products }) => {
//   return (
//     <div className="shopping-cart">
//       <Link>BACK</Link>
//       <div>SHOPPING CART</div>
//       <div className="shopping-cart-product-listing">
//         {products.map(_product => (
//           <CartItem product={_product} />
//         ))}
//       </div>
//       <div>TOTAL</div>
//       <Button>CHECKOUT</Button>
//     </div>
//   );
// };

class ShoppingCart extends React.Component {
  render() {
    return (
      <div className="shopping-cart">
        Cart
        {/* <Link>BACK</Link>
        <div>SHOPPING CART</div>
        <div className="shopping-cart-product-listing">
          {products.map(_product => (
            <CartItem product={_product} />
          ))}
        </div>
        <div>TOTAL</div>
        <Button>CHECKOUT</Button> */}
      </div >
    );
  }
}

export default ShoppingCart;
