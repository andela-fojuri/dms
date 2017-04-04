import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function roleReducer(state = initialState.manageRoles, action) {
  switch (action.type) {
    case types.GET_ROLES_SUCCESS:
      return Object.assign({}, state, { roles: action.roles });
    case types.CREATE_ROLES_SUCCESS:
      return action.roleCreated;
    case types.SHOW_EDITABLE_ROLE:
      return Object.assign({}, state, { editRole: action.role });
    default:
      return state;
  }
}
