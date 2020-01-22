import {
    SET_PRODUCTS,
    SET_SINGLE_PRODUCT,
    SET_USER,
    SET_ORDERS,
    SET_ORDER_DETAILS,
 } from './constants';

export const products = (state = [], action) => {
    switch(action.type) {
        case SET_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}

export const singleProduct = (state = {}, action) => {
    switch(action.type) {
        case SET_SINGLE_PRODUCT:
            return action.product;
        default: 
            return state;
    }
}

export const user = (state = {}, action) => {
    switch(action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}

export const orders = (state = [], action) => {
    switch(action.type) {
        case SET_ORDERS:
            return action.orders;
        default:
            return state;
    }
}

export const orderDetails = (state = [], action) => {
    switch(action.type) {
        case SET_ORDER_DETAILS:
            return action.orderDetails;
        default: 
            return state;
    }
}