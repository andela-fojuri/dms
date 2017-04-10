export default {

  authenticateUser: ((token) => {
    localStorage.setItem('token', token);
  }),

  isUserAuthenticated: (() => localStorage.getItem('token')),

  deauthenticateUser: (() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }),

  getToken: (() => localStorage.getItem('token'))

};

