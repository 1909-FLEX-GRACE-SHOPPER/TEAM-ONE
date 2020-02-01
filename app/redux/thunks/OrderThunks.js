import axios from 'axios';

import { setOrders } from '../actions';

//TODO: Render error component when thunks fail

//Thunk for fetch all orders from a user
export const fetchOrders = userId => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/orders`)
      .then(res => dispatch(setOrders(res.data)))
      .catch(e => console.error('Error fetching orders', e));
  };
};

//Thunk for creating a new order.
//Refetches orders after creating.
export const postOrder = (userId, order) => {
  return dispatch => {
    return axios
      .post(`/api/users/${userId}/orders`, order)
      .then(() => dispatch(fetchOrders(userId)))
      .catch(e => console.error('Error fetch orders', e));
  };
};

//Thunk for deleting an order.
//Refetches orders after creating.
export const deleteOrder = (userId, orderId) => {
  return dispatch => {
    axios
      .delete(`/api/users/${userId}/orders/${orderId}`)
      .then(() => dispatch(fetchOrders(userId)))
      .catch(e => console.error('Error deleting order', e));
  };
};

//Thunk for updating an order
export const updateOrder = (userId, orderId, order) => {
  return dispatch => {
    return axios
      .put(`/api/users/${userId}/orders/${orderId}`, order)
      .then(() => dispatch(fetchOrders(userId)))
      .catch(e => console.error('Error updating order', e));
  };
};
