import { combineReducers } from 'redux';
import roles from './roleReducer';
import mydocument from './documentReducer';
import signupToken from './signupReducer';
import users from './userReducer';
import components from './componentReducer';

const rootReducer = combineReducers({
  roles,
  signupToken,
  mydocument,
  users,
  components
});

export default rootReducer;
