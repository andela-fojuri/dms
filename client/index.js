import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import { getRoles } from './actions/roleActions';
import './styles/styles.css';
import '../node_modules/materialize-css/dist/js/materialize';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/material-icons/css/material-icons.css';

const store = configureStore();
store.dispatch(getRoles());
render(
  <Provider store={store} >
    <Router history={browserHistory} routes={routes} />
  </Provider>,
    document.getElementById('app')
);
