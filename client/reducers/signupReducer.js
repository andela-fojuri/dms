import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function signupReducer(state = initialState.signupDetails, action) {
  switch (action.type) {
    case types.USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, action.signupToken);
    default:
      return state;
  }
}
