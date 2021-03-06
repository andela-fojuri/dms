import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import index from '../models/index';

const User = index.User;
const Role = index.Role;
let allUsers = [];

const Users = {
  create(req, res) {
    User.create({
      username: req.body.username || null,
      email: req.body.email || null,
      password: req.body.password || null,
      password_confirmation: req.body.password_confirmation || null,
      roleId: 3,
    }).then((createdUser) => {
      const token = jwt.sign({
        id: createdUser.id,
        email: createdUser.email,
        roleId: createdUser.roleId
      },
        process.env.SECRET,
        { expiresIn: '10h' });
      res.send({ success: true, message: 'User Created Successfully', createdUser, token });
    }, (error) => {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).send({ success: false, message: error.message });
      } else if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).send({ success: false, message: 'Invalid Username/Email' });
      } else {
        res.status(400).send({ success: false, message: 'Unexpected error occured' });
      }
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  login(req, res) {
    User.findOne({
      where: { username: req.body.username },
      include: [{ model: Role }]
    }).then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password_digest, (err, res2) => {
          if (res2) {
            const token = jwt.sign({
              id: user.id,
              email: user.email,
              roleId: user.roleId,
              Role: user.Role
            }, process.env.SECRET, { expiresIn: '10h' });
            res.send({ success: true, message: 'Successfully logged in', token, user: user.id });
          } else {
            res.send({ success: false, message: 'Invalid Username/Password' });
          }
        });
      } else {
        res.status(200).send({ success: false, message: 'User Not Registered, Kindly signup to proceed' });
      }
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  logout(req, res) {
    if (req.decoded.id) {
      // User.findById(req.decoded.id).then((user) => {
      res.send({ success: true, message: 'Successfully logged out' });
      // });
    }
  },


  getUsers(req, res) {
    User.findAndCountAll({
      offset: req.query.offset || 0,
      limit: req.query.limit || 50
    }).then((response) => {
      allUsers = response.rows;
      res.send({ success: true, message: response.rows, count: response.count });
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  findUser(req, res) {
    User.findOne({ where: { id: req.params.id }, include: [{ model: Role }] }).then((foundUser) => {
      if (foundUser) {
        res.send({ success: true, message: foundUser });
      } else {
        res.status(400).send({ success: false, message: 'Could not find user' });
      }
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },


  updateUser(req, res) {
    User.findById(req.params.id).then((user) => {
      if (req.body.oldPassword && req.body.newPassword && req.body.confirmNewPassword) {
        bcrypt.compare(req.body.oldPassword, user.password_digest, (err, res2) => {
          if (res2) {
            user.update({
              password: req.body.newPassword,
              password_confirmation: req.body.confirmNewPassword,
              username: req.body.username || user.username
            }).then((updatedUser) => {
              res.send({ success: true, message: 'Details Updated Successfully', updatedUser });
            });
          } else {
            res.status(400).send({ success: false, message: 'Incorrect Old Password' });
          }
        });
      } else if (req.body.username || req.body.roleId) {
        user.update({ username: req.body.username || user.username, roleId: req.body.roleId || user.roleId }).then((updatedUser) => {
          res.send({ success: true, message: 'Details Updated Successfully', updatedUser });
        });
      } else {
        res.status(400).send({ success: false, message: 'Field(s) cannot be empty' });
      }
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  deleteUser(req, res) {
    User.findById(req.params.id).then((user) => {
      user.destroy().then((deleted) => {
        res.send({ success: true, message: 'User deleted Successfully' });
      }).catch((err) => {
        res.status(500).send({ success: false, message: 'Unexpected error occured' });
      });
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  searchUser(req, res) {
    if (req.query.username) {
      let searchItem = req.query.username;
      let filtered = [];
      searchItem = searchItem.trim();
      const fil = allUsers;
      if (searchItem.length > 0) {
        filtered = fil.filter(user => user.username.includes(searchItem));
        res.send({ success: true, message: filtered, count: filtered.length });
      } else {
        res.send({ success: true, message: allUsers, count: allUsers.length });
      }
    } else {
      res.send({ success: true, message: allUsers, count: allUsers.length });
    }
  }
};

export default Users;

