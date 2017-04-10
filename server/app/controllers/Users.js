import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import index from '../models/index';

const User = index.User;
const Role = index.Role;
let allUsers = [];

const Users = {
  create(req, res) {
    User.findOne({ where: { username: req.body.username } }).then((foundUser) => {
      if (foundUser) {
        return res.status(409).send({ message: `User with ${req.body.username}exits` });
      }
      User.findOne({ where: { email: req.body.email } }).then((found) => {
        if (found) {
          return res.status(409).send({ message: `User with ${req.body.email}exits` });
        }
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
          res.status(201).send({
            message: 'User Created Successfully',
            token
          });
        });
      });
    }).catch((err) => {
      res.status(501).send({ message: 'Unexpected error occured' });
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
            res.send({
              message: 'Successfully logged in',
              token
            });
          } else {
            res.status(401).send({ message: 'Invalid Username/Password' });
          }
        });
      } else {
        res.status(409).send({ message: 'User Not Registered, Kindly signup to proceed' });
      }
    }).catch((err) => {
      res.status(500).send({ message: 'Unexpected error occured' });
    });
  },

  logout(req, res) {
    if (req.decoded.id) {
      res.send({ success: true, message: 'Successfully logged out' });
    }
  },


  getUsers(req, res) {
    User.findAndCountAll({
      offset: req.query.offset || 0,
      limit: req.query.limit || 50
    }).then((response) => {
      allUsers = response.rows;
      res.send({ users: response.rows, count: response.count });
    }).catch((err) => {
      res.status(501).send({ message: 'Unexpected error occured' });
    });
  },

  findUser(req, res) {
    User.findOne({ where: { id: req.params.id }, include: [{ model: Role }] }).then((foundUser) => {
      if (foundUser) {
        res.status(200).send(foundUser);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    }).catch((err) => {
      res.status(501).send({ message: 'Unexpected error occured' });
    });
  },


  updateUser(req, res) {
    User.findById(req.params.id).then((user) => {
      if (req.body.oldPassword || req.body.newPassword || req.body.confirmNewPassword) {
        bcrypt.compare(req.body.oldPassword, user.password_digest, (err, res2) => {
          if (res2) {
            user.update({
              password: req.body.newPassword || null,
              password_confirmation: req.body.confirmNewPassword || null,
            }).then((updatedUser) => {
              res.send({ message: 'Password Successfully updated' });
            });
          } else {
            res.status(401).send({ message: 'Incorrect Old Password' });
          }
        });
      } else if (req.body.username) {
        user.update({ username: req.body.username || user.username }).then((updatedUser) => {
          res.send({ message: 'Username Updated Successfully' });
        });
      } else if (req.body.roleId) {
        user.update({ roleId: req.body.roleId || user.roleId }).then((updatedUser) => {
          res.send({ message: 'Role Updated Successfully' });
        });
      } else {
        res.status(400).send({ message: 'Field(s) cannot be empty' });
      }
    }).catch((err) => {
      res.status(500).send({ message: 'Unexpected error occured' });
    });
  },

  deleteUser(req, res) {
    User.findById(req.params.id).then((user) => {
      user.destroy().then(() => {
        res.send({ message: 'User deleted Successfully' });
      });
    }).catch((err) => {
      res.status(500).send({ message: 'Unexpected error occured' });
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
        res.send({ users: filtered, count: filtered.length });
      } else {
        res.send({ users: allUsers, count: allUsers.length });
      }
    } else {
      res.send({ users: allUsers, count: allUsers.length });
    }
  }
};

export default Users;

