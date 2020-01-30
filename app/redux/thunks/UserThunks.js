import axios from 'axios';

import { setUser, logInSuccess, loggedInFail, statusMessage } from '../actions';

import { SUCCESS, FAIL, COMMON_FAIL } from './utils';

//Thunk for fetching a user
export const fetchUser = sessionId => {
  return dispatch => {
    return (
      axios
        //.get(`/api/users/id/${userId}`)
        .get(`/api/users/session/${sessionId}`)
        .then(res => dispatch(setUser(res.data)))
        .catch(e => {
          console.error(e);
          dispatch(
            statusMessage({
              status: FAIL,
              text: COMMON_FAIL
            })
          );
        })
    );
  };
};

//Thunk for creating a user
//Sets the user to the created user after creating
export const createUser = user => {
  return dispatch => {
    return axios
      .post(`/api/users`, user)
      .then(res => {
        dispatch(setUser(res.data));
      })
      .then(() => {
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Welcome to Juuls by Jewel'
          })
        );
      })
      .catch(() => {
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'There was an error signing you up. Try again later.'
          })
        );
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
      .then(() => {
        dispatch(setUser(null));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'User successfully deleted'
          })
        );
      })
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

//Thunk for updating a user
//Sets the user to the updated user after updating.
export const updateUser = (userId, user) => {
  return dispatch => {
    return axios
      .put(`/api/users/${userId}`, user)
      .then(res => {
        dispatch(setUser(res.data));
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'User updated.'
          })
        );
      })
      .catch(e => {
        console.log(e);
        dispatch(
          statusMessage({
            status: FAIL
          })
        );
      });
  };
};

//Thunk for logging in a user.
//Sets the User to true, if the credentials are wrong. it will be caught in the catch/error statement
export const logInUser = ({ email, password }) => {
  return dispatch => {
    return axios
      .post(`/api/users/login`, { email, password })
      .then(user => {
        dispatch(logInSuccess());
        dispatch(setUser(user.data));
      })
      .catch(err => {
        dispatch(loggedInFail(err));
      });
  };
};
