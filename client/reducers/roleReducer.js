import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function roleReducer(state = initialState.Roles, action) {
  switch (action.type) {
    case types.GET_ROLES_SUCCESS:
      return Object.assign({}, state, { roles: action.roles });
    case types.SHOW_EDITABLE_ROLE:
      return Object.assign({}, state, { editRole: action.role });
    default:
      return state;
  }
}
