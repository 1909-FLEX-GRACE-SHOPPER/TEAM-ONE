import axios from 'axios';

import {
  statusMessage,
  _setCart,
  _setCartList,
  _removeItemFromCart
} from '../actions';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';

export function setCart(userId) {
  return function thunk(dispatch) {
    console.log('calling setCart thunk');
    return axios
      .get(`/api/users/${userId}/cart`)
      .then(res => {
        if (res.data === '') {
          dispatch(_setCart({}));
        } else {
          dispatch(_setCart(res.data));
        }
      })
      .catch(e => {
        console.error('Error fetching Cart', e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
}

export function fetchCartList(userId) {
  return function thunk(dispatch) {
    return axios
      .get(`/api/users/${userId}/cart/set`)
      .then(res => {
        return dispatch(_setCartList(res.data));
      })
      .catch(e => {
        console.error('Error fetching Cart List', e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
}

export function addToCart(
  productId,
  cartId,
  productQuantity,
  userId,
  subtotal
) {
  return function thunk(dispatch) {
    return axios
      .post(`/api/users/cart/add`, {
        productId,
        cartId,
        productQuantity,
        userId,
        subtotal
      })
      .then(() => dispatch(fetchCartList(userId)))
      .then(() => {
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Added to cart.'
          })
        );
      })
      .catch(e => {
        console.log(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'Unable to add to cart. Please try again'
          })
        );
      });
  };
}

export function removeItemFromCart(item) {
  return function thunk(dispatch) {
    return axios
      .delete(`/api/users/:userId/cart/${item.id}`)
      .then(() => dispatch(_removeItemFromCart(item)))
      .catch(e => {
        console.error('Error removing item from Cart', e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
}

export const createCart = userId => {
  return dispatch => {
    console.log('calling createCart');
    return axios
      .post(`/api/users/${userId}/cart`)
      .then(() => {
        dispatch(setCart(userId));
      })
      .catch(e => {
        console.error('Error creating cart', e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
};

export const updateCart = (userId, payload) => {
  return dispatch => {
    return axios
      .put(`/api/users/${userId}/cart`, payload)
      .then(() => {
        dispatch(setCart(userId));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Cart updated'
          })
        );
      })
      .catch(e => {
        console.error('Error updating cart', e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
};

export const updateCartList = cartItem => {
  return dispatch => {
    return axios
      .put(`/api/users/cart/cartlist/update`, {
        cartItem
      })
      .then(() => dispatch(fetchCartList(cartItem.userId)))
      .catch(e => {
        console.log('ERROR UPDATING CART LIST ', e);
      });
  };
};

export const deleteCart = userId => {
  return dispatch => {
    return axios
      .delete(`/api/users/${userId}/cart`)
      .then(() => dispatch(setCart(userId)))
      .catch(e => {
        console.error('Error deleting cart', e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
};
