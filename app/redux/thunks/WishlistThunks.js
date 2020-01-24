import axios from 'axios';

import { setWishlist } from '../actions';

//TODO: Render error component when thunks fail

//Thunk for fetch all orders from a user
export const fetchWishlist = userId => {
  return dispatch => {
    return axios
      .get(`/api/wishlist/items/${userId}`)
      .then(res => dispatch(setWishlist(res.data)))
      .catch(e => console.error('Error fetching orders', e));
  };
};

export const postWishlist = item => {
  return dispatch => {
    return axios
      .post(`/api/wishlist/add`, item)
      .then(() => dispatch(fetchWishlist(item.userId)))
      .catch(e => console.error('Error fetch orders', e));
  };
};
