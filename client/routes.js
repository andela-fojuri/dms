import React from 'react';
import toastr from 'toastr';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePageComponent from './components/home/HomePage';
import DashboardPageComponent from './components/dashboard/DashboardPage';
import UsersPageComponent from './components/user/UsersPage';
import auth from './middlewares/authentication';

function requireAuth(nextState, replace) {
  if (!localStorage.getItem('token')) {
    toastr.warning('Not authenticated, Kindly Login');
    replace({
      pathname: '/'
    });
  }
}
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePageComponent} />
    <Route path="/login" component={HomePageComponent} />
    <Route path="/logout" component={DashboardPageComponent} />
    <Route path="/signup" component={HomePageComponent} />
    <Route path="dashboard" component={DashboardPageComponent} onEnter={requireAuth} />
    {/* <Route path="users" component={UsersPage} onEnter={requireAuth} />*/}
  </Route>
);
