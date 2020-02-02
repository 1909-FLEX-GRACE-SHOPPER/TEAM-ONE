import axios from 'axios';

import { statusMessage, _setCart, _removeItemFromCart } from '../actions';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';
// TODO: add /${userId} into the route
export function setCart() {
  return function thunk(dispatch) {
    return axios
      .get('/api/users/cart')
      .then(res => res.data)
      .then(cart => {
        return dispatch(_setCart(cart));
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

// TODO: add /${userId} into the route
export function removeItemFromCart(item) {
  return function thunk(dispatch) {
    return axios
      .delete(`/api/users/cart/${item.id}`)
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
