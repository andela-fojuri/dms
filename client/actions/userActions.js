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
      toastr.error('User not found, Kindly signup to Proceed');
    }
  }, (error) => {
    if (!userLogin.username && !userLogin.password) {
      toastr.error('Username/Password Required');
    } else if (!userLogin.username) {
      toastr.error('Username Required');
    } else if (!userLogin.password) {
      toastr.error('Password Required');
    } else if (error.response.data.message === 'Invalid Username/Password') {
      toastr.error('Invalid Username/Password');
    } else if (error.response.data.message.includes('Registered')) {
      toastr.error('User not found, Kindly signup to Proceed');
    } else {
      toastr.error('Unexpected error occured');
    }
  }).catch((error) => {
    toastr.error('Unexpected error occured');
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
  }, (error) => {
    if (error.response.data.message === 'Invalid Username/Email') {
      toastr.error('Invalid Username/Email');
    } else if (!userSignup.username || !userSignup.email || !userSignup.password || !!userSignup.password_confirmation || !userSignup.roleId) {
      toastr.error('All field(s) must be filled');
    } else {
      toastr.error('Unexpected error occured');
    }
  }).catch((error) => {
    throw (error);
  });
}

export function updateUser(user) {
  return dispatch => axios({
    method: 'put',
    url: '/users',
    data: user
  }).then((response) => {
    if (response.data.success) {
      toastr.success(response.data.message);
    } else {
      toastr.error(response.data.message);
    }
  }, (error) => {
    toastr.error('An unexpected error occured');
  }).catch((error) => {
    toastr.error('An unexpected error occured');
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
    toastr.error('Unexpected error occured');
  });
}


export function deleteUser(id) {
  return dispatch => axios({
    url: `/users/${id}`,
    method: 'delete',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.data.success) {
      toastr.success('User deleted successfully');
    } else {
      toastr.error('Unexpected error occured');
    }
  }, () => {
    toastr.error('Unexpected error occured');
  }).catch((error) => {
    toastr.error('Unexpected error occured');
  });
}

export function searchUser(username) {
  return dispatch => axios({
    url: `/search/users?username=${username}`,
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((documents) => {
    dispatch(getUsersSuccess(documents.data.message));
  }).catch((error) => {
    throw (error);
  });
}

