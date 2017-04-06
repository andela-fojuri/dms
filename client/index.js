import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import { getDocs } from './actions/documentActions';
import { findUser } from './actions/userActions';
import { getRoles } from './actions/roleActions';
import './styles/styles.css';
import '../node_modules/jquery/dist/jquery';
import '../node_modules/materialize-css/dist/js/materialize';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/material-icons/css/material-icons.css';

const store = configureStore();
store.dispatch(getRoles());
store.dispatch(getDocs('/user/documents/', 0, 10, 'Accessible Documents'));
store.dispatch(findUser(localStorage.getItem('user')));

render(
  <Provider store={store} >
    <Router history={browserHistory} routes={routes} />
  </Provider>,
    document.getElementById('app')
);

