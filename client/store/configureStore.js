import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

// export default function configureStore(initialState) {
//   return createStore(
//     rootReducer,
//     initialState,
//     applyMiddleware(thunk, reduxImmutableStateInvariant())
//   );
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(initialState) {
 return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())));
}
