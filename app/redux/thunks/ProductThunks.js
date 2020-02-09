import axios from 'axios';

import {
  setProducts,
  setSingleProduct,
  statusMessage,
  setSimilarProducts,
  setFeaturedProducts,
} from '../actions';

import { ITEMS_PER_PAGE } from '../constants';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';

//TODO: Delete console.log on deployment

//Thunk for fetching all products.
//Do you think we could initialize id to null, and reuse this thunk to make a call for a single product?
export const fetchProducts = page => {
  return dispatch => {
    return axios
      .get(`/api/products/limit/${ITEMS_PER_PAGE}/page/${page}`)
      .then(res => dispatch(setProducts(res.data)))
      .catch(e => {
        console.error(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
};

export const fetchSimilarProducts = productId => {
  return dispatch => {
    return axios
      .get(`/api/products/similar/${productId}`)
      .then(res => dispatch(setSimilarProducts(res.data)))
      .catch(e => {
        console.error(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
};

export const fetchFeaturedProducts = () => {
  return dispatch => {
    return axios
      .get(`/api/products/featured`)
      .then(res => dispatch(setFeaturedProducts(res.data)))
      .catch(e => {
        console.error(e)
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        )
      })
  }
}

//Thunk for fetching a single product
export const fetchSingleProduct = productId => {
  return dispatch => {
    return axios
      .get(`/api/products/${productId}`)
      .then(res => dispatch(setSingleProduct(res.data)))
      .catch(e => {
        console.error(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
};

//Thunk for creating a product.
//Refetches products after creating.
export const postProduct = product => {
  return dispatch => {
    return axios
      .post('/api/products', product, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        dispatch(fetchProducts());
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Product successfully added to the shop.'
          })
        );
      })
      .catch(e => {
        console.log(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'There was an error creating a new product. Try again later.'
          })
        );
      });
  };
};

//Thunk for deleting a product.
//Refetches products after deleting.
export const deleteProduct = productId => {
  return dispatch => {
    return axios
      .delete(`/api/products/${productId}`)
      .then(() => {
        dispatch(fetchProducts());
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Product deleted from the shop.'
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

//Thunk for updating a product.
//Refetches the product after updating.
export const updateProduct = (productId, product) => {
  return dispatch => {
    return axios
      .put(`/api/products/${productId}`, product)
      .then(res => {
        dispatch(setSingleProduct(res.data));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Product updated.'
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
