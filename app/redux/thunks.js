import axios from 'axios';

import {
    setProducts,
    setSingleProduct,
    setUser,
    setOrders,
} from 'actions.js';

//Thunk for fetching all products. 
//Do you think we could initialize id to null, and reuse this thunk to make a call for a single product?
export const fetchProducts = () => {
    return dispatch => {
        return axios.get(`/api/products`)
        .then(res => dispatch(setProducts(res.data)))
        .catch(e => console.error('Error fetching products', e))
    }
}

//Thunk for fetching a single product
export const fetchSingleProduct = productId => {
    return dispatch => {
        return axios.get(`/api/products/${ productId }`)
        .then(res => dispatch(setSingleProduct(res.data)))
        .catch(e => console.error('Error fetching single product', e))
    }
}

//Thunk for creating a product.
//Refetches products after creating.
export const postProduct = product => {
    return dispatch => {
        return axios.post(`/api/products`, product)
        .then(() => dispatch(fetchProducts()))
        .catch(e => console.error('Error creating product', e))
    }
}

//Thunk for deleting a product.
//Refetches products after deleting.
export const deleteProduct = productId => {
    return dispatch => {
        return axios.delete(`/api/products/${ productId }`)
        .then(() => dispatch(fetchProducts()))
        .catch(e => console.error('Error deleting product', e))
    }
}

//Thunk for updating a product.
//Refetches the product after updating.
export const updateProduct = (productId, product) => {
    return dispatch => {
        return axios.put(`/api/products/${ productId }`, product)
        .then(res => dispatch(setSingleProduct(res.data)))
        .catch(e => console.error('Error updating product', e))
    }
}

//Thunk for fetching a user
export const fetchUser = (userId = null) => {
    return dispatch => {
        return axios.get(`/api/users/${ userId }`)
        .then(res => dispatch(setUser(res.data)))
        .catch(e => console.error('Error fetching user', e))
    }
}

//Thunk for creating a user
//Sets the user to the created user after creating
export const createUser = user => {
    return dispatch => {
        return axios.post(`/api/users`, user)
        .then(res => dispatch(setUser(res.data)))
        .catch(e => console.error('Error creating user', e))
    }
}

//Thunk for logging in a user.
//Sets the user to the logged in user after logging in.
export const logInUser = ({ email, password }) => {
    return dispatch => {
        return axios.post(`/api/users/login`, { email, password })
        .then(res => dispatch(setUser(res.data)))
        .catch(e => console.error('Error logging user in', e))
    }
}

//Thunk for logging out a user.
//Sets the user to null after logging out.
export const logOutUser = ({ email, password }) => {
    return dispatch => {
        return axios.post(`/api/users/login`, { email, password })
        .then(() => dispatch(setUser(null)))
        .catch(e => console.error('Error logging user out', e))
    }
}

//Thunk for delete a user.
//Sets the user to null after deleting.
export const deleteUser = userId => {
    return dispatch => {
        return axios.delete(`/api/users/${ userId }`)
        .then(() => dispatch(setUser(null)))
        .catch(e => console.error('Error deleting user', e))
    }
}

//Thunk for updating a user
//Sets the user to the updated user after updating.
export const updateUser = (userId, user) => {
    return dispatch => {
        return axios.put(`/api/users/${ userId }`, user)
        .then(res => dispatch(setUser(res.data)))
        .catch(e => console.error('Error updating user', e))
    }
}

//Thunk for fetch all orders from a user
export const fetchOrders = userId => {
    return dispatch => {
        return axios.get(`/api/${ userId }/orders`)
        .then(res => dispatch(setOrders(res.data)))
        .catch(e => console.error('Error fetching orders', e))
    }
}

//Thunk for creating a new order.
//Refetches orders after creating.
export const postOrder = (userId, order) => {
    return dispatch => {
        return axios.post(`/api/${ userId }/orders`, order)
        .then(() => dispatch(fetchOrders(userId)))
        .catch(e => console.error('Error fetch orders', e))
    }
}

//Thunk for deleting an order.
//Refetches orders after creating.
export const deleteOrder = (userId, orderId) => {
    return dispatch => {
        axios.delete(`/api/${ userId }/orders/${ orderId }`)
        .then(() => dispatch(fetchOrders(userId)))
        .catch(e => console.error('Error deleting order', e))
    }
}

//Thunk for updating an order
export const updateOrder = (userId, orderId, order) => {
    return dispatch => {
        return axios.put(`/api/${ userId }/orders/${ orderId }`, order)
        .then(() => dispatch(fetchOrders(userId)))
        .catch(e => console.error('Error updating order', e))
    }
}