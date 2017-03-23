import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import index from '../models/index';

const User = index.User;
let allUsers = [];
const Users = {
  create: ((req, res) => {
    console.log('this is ', process.env.SECRET)
    if (req.body.username && req.body.email && req.body.password && req.body.password_confirmation && req.body.roleId) {
      User.findOne({ where: { email: req.body.email } }).then((userEmail) => {
        if (userEmail) {
          res.send({ failure: 'User Email exists' });
        } else {
          User.findOne({ where: { username: req.body.username } }).then((username) => {
            if (username) {
              res.send({ failure: 'Username exists' });
            } else {
              User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                password_confirmation: req.body.password_confirmation,
                roleId: req.body.roleId
              }).then((createdUser) => {
                const payload = JSON.stringify(createdUser);
                const token = jwt.sign(payload, process.env.SECRET);
                res.send({ success: 'User Created Successfully', createdUser, token });
              }).catch((err) => {
                res.send({ failure: 'Unable to create user', message: err.message });
              });
            }
          });
        }
      });
    } else {
      res.send({ failure: 'All fields must be filled' });
    }
  }),

  login: ((req, res) => {
    if (req.body.username && req.body.password) {
      User.findOne({ where: { username: req.body.username } }).then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password_digest, (err, res2) => {
            if (res2) {
              const payload = JSON.stringify(user);
              const token = jwt.sign(payload, process.env.SECRET);
              res.send({ success: 'Successfully logged in', token });
            } else {
              res.send({ failure: 'Incorrect Username/Password' });
            }
          });
        } else {
          res.send({ failure: 'User not found, Kindly Signup to proceed' });
        }
      });
    }
  }),

  logout: ((req, res) => {
    if (req.decoded.id) {
      User.findById(req.decoded.id).then((user) => {
        res.send({ success: 'Successfully logged out' });
      });
    }
  }),


  getUsers: ((req, res) => {
    if (req.query.limit && req.query.offset) {
      User.findAll({ offset: req.query.offset, limit: req.query.limit }).then((users) => {
        if (users) {
          res.send({ success: true, user: users });
        } else {
          res.send({ failure: 'No user found' });
        }
      });
    } else if (req.query.limit) {
      User.findAll({ limit: req.query.limit }).then((users) => {
        if (users) {
          res.send({ success: true, user: users });
        } else {
          res.send({ failure: 'No user found' });
        }
      });
    } else if (req.query.offset) {
      User.findAll({ offset: req.query.offset }).then((users) => {
        if (users) {
          res.send({ success: true, user: users });
        } else {
          res.send({ failure: 'No user found' });
        }
      });
    } else {
      User.findAll().then((users) => {
        if (users) {
          allUsers = users;
          res.send({ success: true, user: users });
        } else {
          res.send({ failure: 'No user found' });
        }
      });
    }
  }),

  findUser: ((req, res) => {
    if (req.query.id) {
      User.findById(req.query.id).then((foundUser) => {
        if (foundUser) {
          res.send({ success: true, user: foundUser });
        } else {
          res.send({ failure: 'User not found' });
        }
      });
    } else {
      res.send({ failure: 'Kindly provide an ID' });
    }
  }),
  updateUser: ((req, res) => {
    if (req.decoded) {
      User.findById(req.decoded.id).then((user) => {
        if (req.body.oldPassword && req.body.newPassword && req.body.confirmNewPassword) {
          bcrypt.compare(req.body.oldPassword, user.password_digest, (err, res2) => {
            if (res2) {
              user.update({
                password: req.body.newPassword,
                password_confirmation: req.body.confirmNewPassword,
                username: req.body.username || user.username }).then((count, row) => {
                  res.send({ success: 'Details Updated Successfully' });
                });
            } else {
              res.send({ failure: 'Incorrect Old Password' });
            }
          });
        } else if (req.body.username) {
          user.update({ username: req.body.username }).then((count, row) => {
            res.send({ success: 'Name Updated Successfully' });
          });
        } else {
          res.send({ failure: 'Field(s) cannot be empty' });
        }
      }).catch((err) => {
        res.send({ failure: 'Could not find User' });
      });
    } else {
      res.send({ failure: 'Not Authenticated' });
    }
  }),

  deleteUser: ((req, res) => {
    if (req.query.id) {
      User.findById(req.query.id).then((user) => {
        user.destroy().then((deleted) => {
          if (deleted) {
            res.send({ success: 'User deleted Successfully' });
          } else {
            res.send({ success: 'Cannot delete user' });
          }
        });
      }).catch((err) => {
        res.send({ failure: 'Could not find User' });
      });
    } else {
      res.send({ failure: 'No ID provided' });
    }
  }),

  searchUser: ((req, res) => {
    let users = [];
    let found = false;
    if (req.query.username) {
      users = users.concat(allUsers);
      users.forEach((user) => {
        if (req.query.username === user.username) {
          res.send({ success: true, message: user });
          found = true;
        }
      });
      if (!found) {
        res.send({ success: false, message: 'User not found' });
      }
    } else {
      res.send({ success: false, message: 'Field cannot be empty' });
    }
  })
};

export default Users;

