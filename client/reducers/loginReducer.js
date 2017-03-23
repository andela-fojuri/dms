import * as types from '../actions/actionTypes';

export default function loginReducer(state = [], action) {
  switch (action.type) {
    case types.USER_LOGIN:
      return [...state, Object.assign({}, action.userLogin)];

    default:
      return state;
  }
}
