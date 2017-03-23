
import Users from '../controllers/user';
import Documents from '../controllers/document';
import Roles from '../controllers/role';
import auth from '../middlewares/jwtAuthentication';

module.exports = (app) => {
  // User Endpoints
  app.post('/users', Users.create);
  app.post('/users/login', Users.login);
  app.post('/users/logout', auth.authentication, Users.logout);
  app.get('/users', auth.authentication, auth.verifyAdmin, Users.getUsers);
  app.get('/users/id', auth.authentication, Users.findUser);

  app.put('/users/id', auth.authentication, Users.updateUser);
  app.delete('/users/id', auth.authentication, auth.verifyAdmin, Users.deleteUser);
  app.get('/search/users', auth.authentication, auth.verifyAdmin, Users.searchUser);

  // Document Endpoints
  app.post('/documents', auth.authentication, Documents.create);
  app.get('/documents', auth.authentication, auth.verifyAdmin, Documents.getDocuments);
  app.get('/documents/id', auth.authentication, Documents.findDocument);

  app.put('/documents/id', auth.authentication, Documents.updateDocument);
  app.delete('/documents/id', auth.authentication, Documents.deleteDocument);
  app.get('/users/id/documents', auth.authentication, auth.verifyAdmin, Documents.findUserDocument);
  // app.get('/users/documents', auth.authentication, Documents.findMyDocuments);
  app.get('/documents/role', auth.authentication, Documents.getRoleAccess);
  app.get('/documents/user', auth.authentication, Documents.userPublicDocument);
  app.get('/search/documents', auth.authentication, Documents.searchDocument);

  // Role Endpoints
  app.post('/roles', auth.authentication, auth.verifyAdmin, Roles.create);
  app.get('/roles', auth.authentication, auth.verifyAdmin, Roles.getRoles);
  app.get('/users/roles', Roles.getUserRoles);
  app.delete('/roles/id', auth.authentication, auth.verifyAdmin, Roles.deleteRole);

  // Search Endpoints
};

// export default Routes;


