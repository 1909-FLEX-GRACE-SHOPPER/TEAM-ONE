import React from 'react';
import WelcomeMessage from './WelcomeMessage.js';
import Navigation from './Navigation.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { fetchUser } from '../redux/thunks/UserThunks';
import { connect } from 'react-redux';
import Login from './Login';
import Signup from './Signup';
import Products from './Products';
import ProductPage from './ProductPage';
import Product from './Product';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';
import Confirmation from './Confirmation';
import Wishlist from './Wishlist';

import AddProductForm from './AddProductForm';

class Root extends React.Component {
  componentDidMount() {
    const userId = document.cookie.replace(/uuid=/, '');
    this.props.fetchUser(userId);
  }
  render() {
    console.log('USER IS ', this.props.user);
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" component={WelcomeMessage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/add" component={AddProductForm} />
            <Route path="/products/:id" component={ProductPage} />
            <Route
              path="/orders/:orderId/shoppingcart/:userId?" /*component={ShoppingCart} */
            />
            <Route
              path="/orders/:orderId/checkout/:userId?" /*component={Checkout} */
            />
            <Route
              path="/orders/:orderId/confirmation/:userId?" /*component={Confirmation} */
            />
            <Route path="/wishlist/:userId" component={Wishlist} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapState = ({ user }) => ({ user });
const mapDispatch = dispatch => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId))
  };
};
export default connect(mapState, mapDispatch)(Root);
