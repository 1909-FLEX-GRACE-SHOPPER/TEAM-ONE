import React from 'react';
import WelcomeMessage from './WelcomeMessage.js';
import Navigation from './Navigation.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { fetchUser, createUser } from '../redux/thunks/UserThunks';
import { createCart } from '../redux/thunks/CartThunks';
import { connect } from 'react-redux';
import Login from './Login';
import Signup from './Signup';
import Products from './Products';
import ProductPage from './ProductPage';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';
import Receipt from './Receipt';
import Wishlist from './Wishlist';
import ToastComponent from './Toasts';

import AddProductForm from './AddProductForm';

class Root extends React.Component {
  componentDidMount() {
    const { fetchUser, createCart } = this.props;
    fetchUser(document.cookie.replace(/session_id=/, ''))
    .then(() => {
    createCart(this.props.user.id)
    })
  }

  render() {
    const { status, text } = this.props.statusMessage;
    return (
      <Router forceRefresh={true}>
        <div>
          <Navigation />
          <ToastComponent status={status} message={text} />
          <Switch>
            <Route exact path='/' component={WelcomeMessage} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/add' component={AddProductForm} />
            <Route path='/products/:id' component={ProductPage} />
            <Route exact path='/:userId/cart' component={ShoppingCart} />
            <Route path='/checkout' component={ Checkout }/>
            <Route path='/receipt' component={ Receipt } />
            <Route path='/wishlist/:userId' component={Wishlist} />
            <Route path='/user/:id' /*component={UserPage}*/ />
            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapState = ({ user, statusMessage }) => ({ user, statusMessage });
const mapDispatch = dispatch => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId)),
    createUser: user => dispatch(createUser(user)),
    createCart: userId => dispatch(createCart(userId))
  };
};

export default connect(mapState, mapDispatch)(Root);
