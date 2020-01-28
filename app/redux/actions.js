import {
	SET_PRODUCTS,
	SET_SINGLE_PRODUCT,
	SET_USER,
	SET_ORDERS,
	SET_ORDER_DETAILS,
	SET_WISHLIST,
	LOGIN_SUCCCESS,
	LOGIN_ERROR,
	SET_CART,
	ADD_ITEM_TO_CART,
	REMOVE_ITEM_FROM_CART
} from './constants';

export const setProducts = products => {
	return {
		type: SET_PRODUCTS,
		products
	};
};

export const setSingleProduct = product => {
	return {
		type: SET_SINGLE_PRODUCT,
		product
	};
};

export const setUser = user => {
	return {
		type: SET_USER,
		user
	};
};

export const setOrders = orders => {
	return {
		type: SET_ORDERS,
		orders
	};
};

export const setOrderDetails = orderDetails => {
	return {
		type: SET_ORDER_DETAILS,
		orderDetails
	};
};

export const setWishlist = items => {
	return {
		type: SET_WISHLIST,
		items
	};
};

export const logInSuccess = () => {
	return {
		type: LOGIN_SUCCCESS
	};
};

export const loggedInFail = () => {
	return {
		type: LOGIN_ERROR
	};
};

export const setCart = products => {
	return {
		type: SET_CART,
		products
	};
};

export const _addItemToCart = product => {
	return {
		type: ADD_ITEM_TO_CART,
		product
	};
};

export const _removeItemFromCart = product => {
	return {
		type: REMOVE_ITEM_FROM_CART,
		product
	};
};
