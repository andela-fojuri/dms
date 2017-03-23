import axios from 'axios';
import * as actions from './actionTypes';


export function getRolesSuccess(roles) {
  return { type: actions.GET_ROLES_SUCCESS, roles };
}

export function getRoles() {
  return (dispatch) => {
    return axios.get('/users/roles').then(roles => {
      console.log('roles', roles.data);
      dispatch(getRolesSuccess(roles.data));
    }).catch(error => {
      throw(error);
    });
  };
}
