import { combineReducers } from 'redux';
import roles from './roleReducer';
import mydocument from './documentReducer';
import users from './userReducer';
import components from './componentReducer';

const rootReducer = combineReducers({
  roles,
  mydocument,
  users,
  components
});

export default rootReducer;
