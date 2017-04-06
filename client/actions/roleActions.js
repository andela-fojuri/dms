import axios from 'axios';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
import * as actions from './actionTypes';


export function getRolesSuccess(roles) {
  return { type: actions.GET_ROLES_SUCCESS, roles };
}

export function createRoleSuccess(roleCreated) {
  return { type: actions.CREATE_ROLES_SUCCESS, roleCreated };
}

export function getRoles() {
  return dispatch => axios({
    method: 'get',
    url: '/roles',
    headers: { 'x-access-token': localStorage.getItem('token') },
  }).then((response) => {
    if (response.data.success) {
      dispatch(getRolesSuccess(response.data.message));
    }
  }).catch((error) => {
    throw (error);
  });
}

export function saveRole(role) {
  let requestObject = {
    method: 'post',
    url: '/roles',
    data: { category: role.category },
    headers: { 'x-access-token': localStorage.getItem('token') },
  };
  if (role.id !== '') {
    requestObject = Object.assign({}, requestObject, { method: 'put', url: `/roles/${role.id}` });
  }
  return dispatch => axios(requestObject).then((response) => {
    if (response.data.success) {
      dispatch(createRoleSuccess(response.data.message));
    } else {
      toastr.error('Unexpected error occured');
    }
  }, (error) => {
    toastr.error('Unexpected error occured');
  }).catch((error) => {
    toastr.error('Unexpected error occured');
    throw (error);
  });
}

export function editRole(role) {
  return { type: actions.SHOW_EDITABLE_ROLE, role };
}

export function deleteRole(id) {
  return dispatch => axios({
    url: `/roles/${id}`,
    method: 'delete',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.data.success) {
      toastr.success('Role deleted successfully');
    } else {
      toastr.error('Unexpected error occured');
    }
  }).catch((error) => {
    throw (error);
  });
}
