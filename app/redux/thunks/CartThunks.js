import axios from 'axios';

import { statusMessage, _setCart, _removeItemFromCart } from '../actions';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';

export function setCart(userId) {
  return function thunk(dispatch) {
    return axios
      .get(`/api/users/${ userId }/cart`)
      .then(res => dispatch(_setCart(res.data)))
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

export const createCart = userId => {
  console.log('ID', userId)
  return dispatch => {
    return axios
      .post(`/api/users/${ userId }/cart`)
      .then(() => {
        dispatch(setCart(userId))
      })
      .catch(e => {
        console.error('Error creating cart', e)
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        )
      })
  }
}

export const updateCart = (userId, payload) => {
  return dispatch => {
    return axios
      .put(`/api/users/${ userId }/cart`, payload)
      .then(() => {
        dispatch(setCart(userId))
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Cart updated'
          })
        )
      })
      .catch(e => {
        console.error('Error updating cart', e)
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        )
      })
  }
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