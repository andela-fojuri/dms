import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function componentReducer(state = initialState.Components, action) {
  switch (action.type) {
    case types.SHOW_DOC_COMPONENT:
      return Object.assign({},
        state,
        {
          showDocument: true,
          showUsers: false,
          showRoles: false
        });
    case types.SHOW_USER_COMPONENT:
      return Object.assign({},
        state,
        {
          showDocument: false,
          showUsers: true,
          showRoles: false
        });
    case types.SHOW_ROLE_COMPONENT:
      return Object.assign({},
       state,
        {
          showDocument: false,
          showUsers: false,
          showRoles: true
        });
    default:
      return state;
  }
}

