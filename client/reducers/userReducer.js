import { browserHistory } from 'react-router';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.manageUsers, action) {
  switch (action.type) {
    case types.USER_LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      browserHistory.push('/dashboard');
      return undefined;
    case types.GET_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.users, totalUsers: action.count });
    case types.FIND_USER_SUCCESS:
      return Object.assign({}, state, { userDetails: action.userDetails });
    case types.EDIT_USER:
      return Object.assign({}, state, { editUser: action.user });
    default:
      return state;
  }
}
