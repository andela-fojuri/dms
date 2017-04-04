import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function componentReducer(state = initialState.manageComponents, action) {
  switch (action.type) {
    case types.SHOW_DOC_COMPONENT:
      return Object.assign({}, state, { showDoc: true, showUsers: false, showRoles: false });
    case types.SHOW_USER_COMPONENT:
      return Object.assign({}, state, { showDoc: false, showUsers: true, showRoles: false });
    case types.SHOW_ROLE_COMPONENT:
      return Object.assign({}, state, { showDoc: false, showUsers: false, showRoles: true });
    default:
      return state;
  }
}

