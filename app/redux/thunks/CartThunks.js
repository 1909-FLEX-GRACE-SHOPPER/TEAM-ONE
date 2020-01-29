import axios from "axios";

import { setCart, addItemToCart, _removeItemFromCart } from "../actions";
// temporary fetchCart thunk
export function fetchCart() {
  return function thunk(dispatch) {
    return axios
      .get(`/api/cart`)
      .then(res => res.data)
      .then(products => dispatch(setCart(products)))
      .catch(e => console.error("Error fetching Cart", e));
  };
}
/*
export function fetchCart() {
  return function thunk(dispatch) {
    return axios
      .get(`/api/cart/${userId}`)
      .then(res => res.data)
      .then(products => dispatch(setCart(products)))
      .catch(e => console.error("Error fetching Cart", e));
  };
}

export function addItemToCart() {
  return function thunk(dispatch) {
    return axios
      .post(`/api/cart/add/${userId}`, product)
      .then(res => res.data)
      .then(product => dispatch(_addItemToCart(product)))
      .catch(e => console.error("Error adding Cart item", e));
  };
}

export function removeItemFromCart(product) {
  return function thunk(dispatch) {
    return axios
      .delete(`/api/cart/remove/${productId}`)
      .then(() => dispatch(_removeItemFromCart(product)))
      .catch(e => console.error("Error removing Cart item", e));
  };
}
*/
