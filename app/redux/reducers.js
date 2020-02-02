import {
  SET_PRODUCTS,
  SET_SINGLE_PRODUCT,
  SET_USER,
  SET_ORDERS,
  SET_ORDER_DETAILS,
  LOGIN_SUCCCESS,
  LOGIN_ERROR,
  SET_WISHLIST,
  STATUS_MESSAGE,
  SET_SIMILAR_PRODUCTS
} from './constants';

export const products = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export const singleProduct = (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

export const similarProducts = (state = [], action) => {
  switch (action.type) {
    case SET_SIMILAR_PRODUCTS:
      return action.similar_products;
    default:
      return state;
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

export const orders = (state = [], action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
};

export const orderDetails = (state = [], action) => {
  switch (action.type) {
    case SET_ORDER_DETAILS:
      return action.orderDetails;
    default:
      return state;
  }
};

export const authentication = (
  state = { authError: null, logInStatus: null },
  action
) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return {
        ...state,
        authError: 'Login Failed',
        logInStatus: false
      };
    case LOGIN_SUCCCESS:
      return {
        ...state,
        authError: null,
        logInStatus: true
      };
    default:
      return state;
  }
};

export const wishlist = (state = [], action) => {
  switch (action.type) {
    case SET_WISHLIST:
      return action.wishlist;
    default:
      return state;
  }
};

export const statusMessage = (state = { status: null, text: '' }, action) => {
  switch (action.type) {
    case STATUS_MESSAGE:
      return action.message;
    default:
      return state;
  }
};
