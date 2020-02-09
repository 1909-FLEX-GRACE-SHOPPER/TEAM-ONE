import axios from 'axios';

import { setWishlist, statusMessage } from '../actions';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';

//TODO: Delete console.logs on deployment
export const fetchWishlist = userId => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/wishlist`)
      .then(res => {
        dispatch(setWishlist(res.data));
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

export const postWishlist = (productId, userId) => {
  return dispatch => {
    return axios
      .post(`/api/users/wishlist`, { productId, userId })
      .then(() => {
        dispatch(fetchWishlist(userId));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Wishlist item added.'
          })
        );
      })
      .catch(e => {
        console.log('Error adding wishlist', e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: COMMON_FAIL
          })
        );
      });
  };
};

export const deleteWishlist = (item, userId) => {
  return dispatch => {
    return axios
      .delete(`/api/users/${ userId }/wishlist/${item.id}`)
      .then(() => dispatch(fetchWishlist(userId)))
      .then(() => {
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Removed from Wishlist.'
          })
        );
      })
      .catch(e => {
        console.log(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'Unable to delete wishlist item. Please try again'
          })
        );
      });
  };
};
