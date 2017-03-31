import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.loginDetails, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, action.loginToken);
    default:
      return state;
  }
}
