import axios from 'axios';

import {
  statusMessage,
  _setCart,
  addItemToCart,
  _removeItemFromCart
} from '../actions';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';
// TODO: add /${userId} into the route
export function setCart() {
  return function thunk(dispatch) {
    return axios
      .get('/api/users/cart')
      .then(res => res.data)
      .then(cart => dispatch(_setCart(cart)))
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
*/

// TODO: add /${userId} into the route
export function removeItemFromCart(item) {
  return function thunk(dispatch) {
    return axios
      .delete(`/api/cart/${item.id}`)
      .then(() => dispatch(_removeItemFromCart(item)))
      .catch(e => console.error('Error removing Cart item', e));
  };
}
