import axios from 'axios';

import { setWishlist, statusMessage } from '../actions';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';

//TODO: Delete console.logs on deployment
export const fetchWishlist = userId => {
  return dispatch => {
    return axios
      .get(`/api/wishlist/items/${userId}`)
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

export const postWishlist = item => {
  return dispatch => {
    return axios
      .post(`/api/wishlist/add`, item)
      .then(() => {
        dispatch(fetchWishlist(item.userId));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Wishlist item added.'
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

export const deleteWishlist = item => {
  return dispatch => {
    return axios
      .delete(`/api/wishlist/remove/${item.id}`)
      .then(() => dispatch(fetchWishlist(item.userId)))
      .catch(e => console.log('Error deleting WL item ', e));
  };
};
