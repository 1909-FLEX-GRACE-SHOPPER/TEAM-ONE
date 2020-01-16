import React from "react";
import { Link } from "react-router-dom";
import WishlistItem from "./WishlistItem.js";

const Wishlist = ({ products }) => {
  return (
    <div>
      <Link>Back</Link>
      <div className="wishlist-product-listing">
        {products.map(_product => (
          <WishlistItem product={_product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
