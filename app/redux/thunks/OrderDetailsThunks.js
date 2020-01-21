import axios from 'axios';

import { setOrderDetails } from '../actions';

//TODO: Render error component when thunks fail

//Thunk to fetch orderDetails from an order.
export const fetchOrderDetails = orderId => {
    return dispatch => {
        return axios.get(`/api/orders/${ orderId }/orderDetails`)
        .then(res => dispatch(setOrderDetails(res.data)))
        .catch(e => console.error('Error fetching order details', e))
    }
}

//Thunk to post a new orderDetail to an order.
//Fetches orders after creating.
export const postOrderDetails = (orderId, orderDetailId, orderDetail) => {
    return dispatch => {
        return axios.post(`/api/orders/${ orderId }/orderDetails/${ orderDetailId }`, orderDetail)
        ,then(() => dispatch(fetchOrderDetails(orderId)))
        .catch(e => console.error('Error creating order details', e))
    }
}

//Thunk to delete an orderDetail.
//Fetches orders after deleting.
export const deleteOrderDetails = (orderId, orderDetailId) => {
    return dispatch => {
        return axios.delete(`/api/orders/${ orderId }/orderDetails/${ orderDetailId }`)
        .then(() => dispatch(fetchOrderDetails(orderId)))
        .catch(e => console.error('Error deleting order details', e))
    }
}

//Thunk to update an orderDetail.
//Fetches orders after deleting.
export const updateOrderDetails = (orderId, orderDetailId, orderDetail) => {
    return dispatch => {
        return axios.put(`/api/orders/${ orderId }/orderDetails/${ orderDetailId}`, orderDetail)
        .then(() => dispatch(fetchOrderDetails(orderId)))
        .catch(e => console.error('Error updating order details', e))
    }
}