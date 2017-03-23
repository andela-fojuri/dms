import * as types from './actionTypes';

export function login(userLogin) {
  return { type: types.USER_LOGIN, userLogin };
}

export function signup(userSignup) {
  return { type: types.USER_SIGNUP, userSignup };
}
