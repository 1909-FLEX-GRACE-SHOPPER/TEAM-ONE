import axios from 'axios';

import {
  statusMessage,
  setCart,
  addItemToCart,
  _removeItemFromCart
} from '../actions';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';

export function fetchCart(userId) {
  return function thunk(dispatch) {
    return axios
      .get(`/api/users/${userId}/cart`)
      .then(res => res.data)
      .then(cart => dispatch(setCart(cart)))
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
/*

export function addItemToCart() {
  return function thunk(dispatch) {
    return axios
      .post(`/api/cart/add/${userId}`, product)
      .then(res => res.data)
      .then(product => dispatch(_addItemToCart(product)))
      .catch(e => console.error("Error adding Cart item", e));
  };
}

export function removeItemFromCart(product) {
  return function thunk(dispatch) {
    return axios
      .delete(`/api/cart/remove/${productId}`)
      .then(() => dispatch(_removeItemFromCart(product)))
      .catch(e => console.error("Error removing Cart item", e));
  };
}
*/
