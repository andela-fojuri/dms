import React from 'react';
import toastr from 'toastr';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import DashboardPage from './components/dashboard/DashboardPage';
import auth from './middlewares/authentication';

function requireAuth(nextState, replace) {
  if (!localStorage.getItem('token')) {
    console.log('hi');
    toastr.warning('Not authenticated, Kindly Login');
    replace({
      pathname: '/'
    });
  }
}
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/login" component={HomePage} />
    <Route path="/logout" component={DashboardPage} />
    <Route path="/signup" component={HomePage} />
    <Route path="dashboard" component={DashboardPage} onEnter={requireAuth} />
  </Route>
);
