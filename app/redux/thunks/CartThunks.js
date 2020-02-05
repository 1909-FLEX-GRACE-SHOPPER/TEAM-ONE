import axios from 'axios';

import { statusMessage, _setCart, _removeItemFromCart } from '../actions';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';

export function setCart(userId) {
  return function thunk(dispatch) {
    return axios
      .get(`/api/users/${userId}/cart`)
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

export const updateCart = (productId, userId, productQuantity) => {
  return dispatch => {
    return axios
      .put(`/api/users/${userId}/cart`, productId, productQuantity)
      .then(() => {
        dispatch(setCart(cartId));
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
