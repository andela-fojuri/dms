import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import { getAccessibleDocuments } from './actions/documentActions';
import { getRoles } from './actions/roleActions';
import { findUser } from './actions/userActions';
import './styles/styles.css';
import '../node_modules/jquery/dist/jquery';
// import '../node_modules/velocity-animate/velocity';
import '../node_modules/materialize-css/dist/js/materialize';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/material-icons/css/material-icons.css';

const store = configureStore();
store.dispatch(getRoles());
store.dispatch(getAccessibleDocuments());
store.dispatch(findUser(localStorage.getItem('user')));

render(
  <Provider store={store} >
    <Router history={browserHistory} routes={routes} />
  </Provider>,
    document.getElementById('app')
);

