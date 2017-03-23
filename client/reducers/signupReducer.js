import * as types from '../actions/actionTypes';

export default function loginReducer(state = [], action) {
  switch (action.type) {
    case types.USER_SIGNUP:
      return [...state, Object.assign({}, action.userSignup)];

    default:
      return state;
  }
}
