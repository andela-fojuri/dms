import axios from 'axios';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import * as types from './actionTypes';
import { browserHistory } from 'react-router';

export function signUp(signupToken) {
  return { type: types.USER_SIGNUP_SUCCESS, signupToken };
}

export function editUser(user) {
  return { type: types.EDIT_USER, user };
}

export function getUsersSuccess(users) {
  return { type: types.GET_USERS_SUCCESS, users };
}

export function findUserSuccess(userDetails) {
  return { type: types.FIND_USER_SUCCESS, userDetails };
}

export function loginUser(userLogin) {
  return dispatch => axios({
    method: 'post',
    url: '/users/login',
    data: userLogin
  }).then((response) => {
    if (response.data.success) {
      toastr.success(response.data.message);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user);
      dispatch(findUser(localStorage.getItem('user')));
    } else {
      // console.log(response.data);
    }
  }).catch((error) => {
    throw (error);
  });
}

export function createUser(userSignup) {
  return dispatch => axios({
    method: 'post',
    url: '/users',
    data: userSignup
  }).then((response) => {
    if (response.data.success) {
      dispatch(loginUser(userSignup));
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
  }).then((response) => {
    dispatch(getUsersSuccess(response.data.message));
  }).catch((error) => {
    throw (error);
  });
}

export function findUser(id) {
  return dispatch => axios({
    url: `/users/${id}`,
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    dispatch(findUserSuccess(response.data.message));
    browserHistory.push('/dashboard');
  }).catch((error) => {
    throw (error);
  });
}



