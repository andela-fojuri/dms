import axios from 'axios';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import * as types from './actionTypes';

export function login(loginToken) {
  return { type: types.USER_LOGIN_SUCCESS, loginToken };
}

export function signUp(signupToken) {
  return { type: types.USER_SIGNUP_SUCCESS, signupToken };
}

export function editUser(user) {
  return { type: types.EDIT_USER, user };
}

export function getUsersSuccess(users) {
  return { type: types.GET_USERS_SUCCESS, users };
}

export function createUser(userSignup) {
  return dispatch => axios({
    method: 'post',
    url: '/users',
    data: userSignup
  }).then((response) => {
    if (response.data.success) {
      toastr.success(response.data.message);
      localStorage.setItem('token', response.data.token);
      const decodedToken = jwt.decode(response.data.token);
      dispatch(signUp(decodedToken));
    } else {
      console.log(response.data);
    }
  }).catch((error) => {
    throw (error);
  });
}

export function getUsers() {
  return dispatch => axios({
    url: '/users',
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((users) => {
    dispatch(getUsersSuccess(users.data.message));
  }).catch((error) => {
    throw (error);
  });
}

export function loginUser(userLogin) {
  return dispatch => axios({
    method: 'post',
    url: '/users/login',
    data: userLogin
  }).then((response) => {
    if (response.data.success) {
      console.log('headers', response.headers);
      toastr.success(response.data.message);
      localStorage.setItem('token', response.data.token);
      const decodedToken = jwt.decode(response.data.token);
      dispatch(login(decodedToken));
      console.log(decodedToken);
    } else {
      console.log(response.data);
    }
  }).catch((error) => {
    throw (error);
  });
}

