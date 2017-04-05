
import Users from '../controllers/user';
import Documents from '../controllers/document';
import Roles from '../controllers/role';
import auth from '../middlewares/jwtAuthentication';

const { authentication, verifyAdmin, verifyAdminOrOwner } = auth;

module.exports = (app) => {
  // User Endpoints
  app.post('/users', Users.create);
  app.post('/users/login', Users.login);
  app.post('/users/logout', authentication, Users.logout);
  app.get('/users', authentication, verifyAdmin, Users.getUsers);
  app.get('/users/:id', authentication, Users.findUser);

  app.put('/users/:id', authentication, verifyAdminOrOwner, Users.updateUser);
  app.delete('/users/:id', authentication, verifyAdmin, Users.deleteUser);
  app.get('/search/users', authentication, verifyAdmin, Users.searchUser);

  // Document Endpoints
  app.post('/documents', authentication, Documents.create);
  app.get('/documents', authentication, verifyAdmin, Documents.getDocuments);
  app.get('/documents/:id', authentication, Documents.findDocument);

  app.put('/documents/:id', authentication, verifyAdminOrOwner, Documents.updateDocument);
  app.delete('/documents/:id', authentication, Documents.deleteDocument);
  app.get('/users/:id/documents', authentication, verifyAdminOrOwner, Documents.findUserDocument);
  app.get('/user/documents', authentication, Documents.userDocument);
  app.get('/role/documents', authentication, Documents.getRoleAccess);
  app.get('/public/documents', authentication, Documents.publicDocument);
  app.get('/search/documents', authentication, Documents.searchDocument);

  // Role Endpoints
  app.post('/roles', authentication, verifyAdmin, Roles.create);
  app.put('/roles/:id', authentication, verifyAdmin, Roles.updateRole);
  app.delete('/roles/:id', authentication, verifyAdmin, Roles.deleteRole);
  app.get('/roles', Roles.getRoles);
  app.get('/user/roles', Roles.getUserRoles);
  // Search Endpoints
};

// export default Routes;


