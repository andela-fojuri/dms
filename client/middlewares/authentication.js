export default {

  authenticateUser: ((token) => {
    localStorage.setItem('token', token);
  }),

  isUserAuthenticated: (() => {
    return localStorage.getItem('token');
  }),


  deauthenticateUser: (() => {
    localStorage.removeItem('token');
  }),

  getToken: (() => localStorage.getItem('token'))

};

