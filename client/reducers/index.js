import { combineReducers } from 'redux';
import loginDetails from './loginReducer';
import roles from './roleReducer';

const rootReducer = combineReducers({
  loginDetails,
  roles
});

export default rootReducer;
