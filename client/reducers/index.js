import { combineReducers } from 'redux';
import roles from './roleReducer';
import mydocument from './documentReducer';
import signupToken from './signupReducer';
import users from './userReducer';

const rootReducer = combineReducers({
  roles,
  signupToken,
  mydocument,
  users
});

export default rootReducer;
