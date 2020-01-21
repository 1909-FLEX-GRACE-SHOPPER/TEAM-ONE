import React from "react";
import WelcomeMessage from "./WelcomeMessage.js";
import Navigation from "./Navigation.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Products from "./Products";
import Product from "./Product";
import ShoppingCart from "./ShoppingCart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import WishList from "./Wishlist";

const Root = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={WelcomeMessage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/products" /*component={Products}*/ />
          <Route path="/products/:id" /*component={Product}*/ />
          <Route
            path="/orders/:orderId/shoppingcart/:userId?" /*component={ShoppingCart} */
          />
          <Route
            path="/orders/:orderId/checkout/:userId?" /*component={Checkout} */
          />
          <Route
            path="/orders/:orderId/confirmation/:userId?" /*component={Confirmation} */
          />
          <Route path="/wishlist/:userId" /*component={WishList} */ />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default Root;
