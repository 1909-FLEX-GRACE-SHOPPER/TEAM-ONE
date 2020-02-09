import axios from 'axios';

import { setOrderDetails, statusMessage } from '../actions';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';

//TODO: delete console.logs on deployment

//Thunk to fetch orderDetails from an order.
export const fetchOrderDetails = userId => {
  return dispatch => {
    return axios
      .get(`/api/orders/${userId}/orderDetails`)
      .then(res => dispatch(setOrderDetails(res.data)))
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

//Thunk to post a new orderDetail to an order.
//Fetches orders after creating.
export const postOrderDetails = (orderId, orderDetailId, orderDetail) => {
  return dispatch => {
    return axios
      .post(`/api/orders/${orderId}/orderDetails/${orderDetailId}`, orderDetail)
      .then(() => {
        dispatch(fetchOrderDetails(orderId));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Order detail added'
          })
        );
      })
      .catch(e => {
        console.log(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: `There was an error creating a new order detail. Try again later.`
          })
        );
      });
  };
};

//Thunk to delete an orderDetail.
//Fetches orders after deleting.
export const deleteOrderDetails = (orderId, orderDetailId) => {
  return dispatch => {
    return axios
      .delete(`/api/orders/${orderId}/orderDetails/${orderDetailId}`)
      .then(() => {
        dispatch(fetchOrderDetails(orderId));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Order detail deleted'
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

//Thunk to update an orderDetail.
//Fetches orders after updating.
export const updateOrderDetails = (orderId, orderDetailId, orderDetail) => {
  return dispatch => {
    return axios
      .put(`/api/orders/${orderId}/orderDetails/${orderDetailId}`, orderDetail)
      .then(() => {
        dispatch(fetchOrderDetails(orderId));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Order detail updated'
          })
        );
      })
      .catch(e => {
        console.log(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: `There was an error updating your order detail. Try again later.`
          })
        );
      });
  };
};
