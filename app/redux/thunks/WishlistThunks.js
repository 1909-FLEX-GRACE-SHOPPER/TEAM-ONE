import axios from 'axios';

import { setWishlist } from '../actions';

//TODO: Render error component when thunks fail
export const fetchWishlist = userId => {
  return dispatch => {
    return axios
      .get(`/api/wishlist/items/${userId}`)
      .then(res => {
        dispatch(setWishlist(res.data));
      })
      .catch(e => console.error('Error fetching WL', e));
  };
};

export const postWishlist = item => {
  return dispatch => {
    return axios
      .post(`/api/wishlist/add`, item)
      .then(() => dispatch(fetchWishlist(item.userId)))
      .catch(e => console.error('Error adding WL item', e));
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
