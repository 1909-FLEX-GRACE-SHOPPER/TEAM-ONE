import { combineReducers } from 'redux';

import {
  products,
  singleProduct,
  user,
  orders,
  orderDetails,
  authentication,
  wishlist,
  cart,
  statusMessage,
  similarProducts,
  gitHubData,
} from './reducers';

export default combineReducers({
  products,
  singleProduct,
  user,
  orders,
  orderDetails,
  authentication,
  wishlist,
  cart,
  statusMessage,
  similarProducts,
  gitHubData,
});
