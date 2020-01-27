import axios from 'axios';

import { setProducts, setSingleProduct } from '../actions';

//TODO: Render error component when thunks fail

//Thunk for fetching all products.
//Do you think we could initialize id to null, and reuse this thunk to make a call for a single product?
export const fetchProducts = () => {
  return dispatch => {
    return axios
      .get(`/api/products`)
      .then(res => dispatch(setProducts(res.data)))
      .catch(e => console.error('Error fetching products', e));
  };
};

//Thunk for fetching a single product
export const fetchSingleProduct = productId => {
  return dispatch => {
    return axios
      .get(`/api/products/${productId}`)
      .then(res => dispatch(setSingleProduct(res.data)))
      .catch(e => console.error('Error fetching single product', e));
  };
};

//Thunk for creating a product.
//Refetches products after creating.
export const postProduct = product => {
  return dispatch => {
    return axios
      .post(`/api/products`, product, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => dispatch(fetchProducts()))
      .catch(() => {
        dispatch(errorMessage('Error creating a User'))
      })
  };
};

//Thunk for deleting a product.
//Refetches products after deleting.
export const deleteProduct = productId => {
  return dispatch => {
    return axios
      .delete(`/api/products/${productId}`)
      .then(() => dispatch(fetchProducts()))
      .catch(e => console.error('Error deleting product', e));
  };
};

//Thunk for updating a product.
//Refetches the product after updating.
export const updateProduct = (productId, product) => {
  return dispatch => {
    return axios
      .put(`/api/products/${productId}`, product)
      .then(res => dispatch(setSingleProduct(res.data)))
      .catch(e => console.error('Error updating product', e));
  };
};
