import axios from 'axios';

import { setUser, logInSuccess, loggedInFail, errorMessage } from '../actions';

//TODO: Render error component when thunks fail

//Thunk for fetching a user
export const fetchUser = (userId = null) => {
  return dispatch => {
    return axios
      .get(`/api/users/id/${userId}`)
      .then(res => dispatch(setUser(res.data)))
      .catch(e => console.error('Error fetching user', e));
  };
};

//Thunk for creating a user
//Sets the user to the created user after creating
export const createUser = user => {
  return dispatch => {
    return axios
      .post(`/api/users`, user)
      .then(res => {
        dispatch(setUser(res.data))
        dispatch(errorMessage(''))
      })
      .catch(() => {
        dispatch(errorMessage('Error creating a User'))
      });
  };
};

//Thunk for logging out a user.
//Sets the user to null after logging out.
export const logOutUser = ({ email, password }) => {
  return dispatch => {
    return axios
      .post(`/api/users/login`, { email, password })
      .then(() => dispatch(setUser(null)))
      .catch(e => console.error('Error logging user out', e));
  };
};

//Thunk for delete a user.
//Sets the user to null after deleting.
export const deleteUser = userId => {
  return dispatch => {
    return axios
      .delete(`/api/users/${userId}`)
      .then(() => dispatch(setUser(null)))
      .catch(e => console.error('Error deleting user', e));
  };
};

//Thunk for updating a user
//Sets the user to the updated user after updating.
export const updateUser = (userId, user) => {
  return dispatch => {
    return axios
      .put(`/api/users/${userId}`, user)
      .then(res => dispatch(setUser(res.data)))
      .catch(e => console.error('Error updating user', e));
  };
};

//Thunk for logging in a user.
//Sets the User to true, if the credentials are wrong. it will be caught in the catch/error statement
export const logInUser = ({ email, password }) => {
  return dispatch => {
    return axios
      .post(`/api/users/login`, { email, password })
      .then(() => {
        dispatch(logInSuccess());
      })
      .catch(err => {
        dispatch(loggedInFail(err));
      });
  };
};
