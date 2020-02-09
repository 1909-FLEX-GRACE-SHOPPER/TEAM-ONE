import axios from 'axios';

import { setOrders, statusMessage } from '../actions';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';

//TODO: Delete console.logs on deployment

//Thunk for fetch all orders from a user
export const fetchOrders = userId => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/orders`)
      .then(res => {
        dispatch(setOrders(res.data));
      })
      .catch(e => {
        console.log(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
};

//Thunk for creating a new order.
//Refetches orders after creating.
export const postOrder = order => {
  return dispatch => {
    return axios
      .post(`/api/orders`, order)
      .then(() => {
        dispatch(fetchOrders(order.userId));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text:
              'Your order has been received and is currently being processed.'
          })
        );
      })
      .catch(e => {
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'There was an error creating a new order. Try again later.'
          })
        );
      });
  };
};

//Thunk for deleting an order.
//Refetches orders after creating.
export const deleteOrder = (userId, orderId) => {
  return dispatch => {
    axios
      .delete(`/api/users/${userId}/orders/${orderId}`)
      .then(() => {
        dispatch(fetchOrders(userId));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Order deleted'
          })
        );
      })
      .catch(e => {
        console.log(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
};

//Thunk for updating an order
export const updateOrder = (userId, orderId, order) => {
  return dispatch => {
    return axios
      .put(`/api/users/${userId}/orders/${orderId}`, order)
      .then(() => {
        dispatch(fetchOrders(userId));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Order updated'
          })
        );
      })
      .catch(e => {
        console.log(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'There was an error updating your order. Try again later.'
          })
        );
      });
  };
};
