

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
import jwt from 'jsonwebtoken';
import index from '../models/index';

const Role = index.Role;
// route middleware to verify a token
export default {
  authentication: ((req, res, next) => {
   
    const token = req.headers.authorization || req.headers['x-access-token'];
    // decode token
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'User not authenticated'
      });
    }
  }),

  verifyAdmin: ((req, res, next) => {
    if (req.decoded) {
      const { Role: { category } } = req.decoded;
      if (category === 'SuperAdmin' || category === 'Admin') {
        next();
      } else {
        res.send({
          success: false,
          message: 'Not authenticated as Super Admin'
        });
      }
    } else {
      res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
    }
  }),

  verifyAdminOrOwner: ((req, res, next) => {
    const { id } = req.params;
    if (req.decoded) {
      const { Role: { category }, id: userId } = req.decoded;
      if (category === 'SuperAdmin' || category === 'Admin' || Number(id) === userId) {
        next();
      } else {
        res.send({
          success: false,
          message: 'Not authenticated as Super Admin or owner'
        });
      }
    } else {
      res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
    }
  })
};
