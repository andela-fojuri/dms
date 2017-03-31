import { combineReducers } from 'redux';
import loginToken from './loginReducer';
import roles from './roleReducer';
import mydocument from './documentReducer';
import signupToken from './signupReducer';
import users from './userReducer';

const rootReducer = combineReducers({
  loginToken,
  roles,
  signupToken,
  mydocument,
  users
});

export default rootReducer;
