import axios from 'axios';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';
import auth from '../middlewares/authentication';
import { getDocs } from './documentActions';
import { getRoles } from './roleActions';
import * as types from './actionTypes';


export function editUser(user) {
  return { type: types.EDIT_USER, user };
}

export function getUsersSuccess(users, count) {
  return { type: types.GET_USERS_SUCCESS, users, count };
}

export function userLogoutSuccess() {
  return { type: types.USER_LOGOUT_SUCCESS };
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
    if (response.status === 200) {
      browserHistory.push('/dashboard');
      dispatch(findUserSuccess(response.data));
    }
  }).catch((error) => {
    toastr.error(error.response.data.message);
  });
}

export function loginUser(userLogin) {
  if ((!userLogin.username || userLogin.username === '')
   && (!userLogin.password || userLogin.password === '')) {
    toastr.error('Username/Password Required');
  } else if (!userLogin.username || userLogin.username === '') {
    toastr.error('Username Required');
  } else if (!userLogin.password || userLogin.password === '') {
    toastr.error('Password Required');
  } else {
    return dispatch => axios({
      method: 'post',
      url: '/users/login',
      data: userLogin
    }).then((response) => {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const user = jwt.decode(localStorage.getItem('token'));
        dispatch(findUser(user.id));
        dispatch(getDocs('/user/documents/', 0, 10, 'Accessible Documents'));
        dispatch(getRoles());
        toastr.success(response.data.message);
      } else {
        toastr.error(response.data.message);
      }
    }).catch((error) => {
      toastr.error(error.response.data.message);
    });
  }
}

export function createUser(userSignup) {
  return dispatch => axios({
    method: 'post',
    url: '/users',
    data: userSignup
  }).then((response) => {
    if (response.data.token) {
      dispatch(loginUser(userSignup));
    } else {
      toastr.error(response.data.token);
    }
  }).catch((error) => {
    toastr.error(error.response.data.message);
  });
}

export function updateUser(user) {
  return dispatch => axios({
    method: 'put',
    url: `/users/${user.id}`,
    data: user,
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.status === 200) {
      toastr.success(response.data.message);
    } else {
      toastr.error(response.data.message);
    }
  }).catch((error) => {
    toastr.error(error.response.data.message);
    throw (error);
  });
}

export function getUsers(offset, limit) {
  return dispatch => axios({
    url: `/users?offset=${offset}&limit=${limit}`,
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.data.users) {
      dispatch(getUsersSuccess(response.data.users, response.data.count));
    }
  }).catch((error) => {
    toastr.error(error.response.data.message);
  });
}

export function deleteUser(id) {
  return dispatch => axios({
    url: `/users/${id}`,
    method: 'delete',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.status === 200) {
      toastr.success(response.data.message);
    } else {
      toastr.error(response.data.message);
    }
  }).catch((error) => {
    toastr.error(error.response.data.message);
  });
}

export function searchUser(username) {
  return dispatch => axios({
    url: `/search/users?username=${username}`,
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.data.users) {
      dispatch(getUsersSuccess(response.data.message, response.data.count));
    }
  }).catch((error) => {
    throw (error);
  });
}

