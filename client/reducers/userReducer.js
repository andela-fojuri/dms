import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.manageUsers, action) {
  switch (action.type) {
    case types.GET_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.users });
    case types.EDIT_USER:
      $('#editUser').modal('open');
      return Object.assign({}, state, { editUser: action.user });
    default:
      return state;
  }
}
