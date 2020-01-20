import {
    SET_PRODUCTS,
    SET_USER,
    SET_SINGLE_PRODUCT,
    SET_ORDERS,
    SET_ORDER_DETAILS,
} from './constants';

export const setProducts = products => {
    return {
        type: SET_PRODUCTS,
        products,
    }
}

export const setSingleProduct = product => {
    return {
        type: SET_SINGLE_PRODUCT,
        product,
    }
}

export const setUser = user => {
    return {
        type: SET_USER,
        user,
    }
}

export const setOrders = orders => {
    return {
        type: SET_ORDERS,
        orders,
    }
}

export const setOrderDetails = orderDetails => {
    return {
        type: SET_ORDER_DETAILS,
        orderDetails,
    }
}