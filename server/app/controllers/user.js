import bcrypt from 'bcrypt';
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
      roleId: req.body.roleId,
    }).then((createdUser) => {
      const payload = JSON.stringify(createdUser);
      const token = jwt.sign(payload, process.env.SECRET);
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
          // delete password
          if (res2) {
            const payload = JSON.stringify(user);
            const token = jwt.sign(payload, process.env.SECRET);
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
      User.findById(req.decoded.id).then((user) => {
        res.send({ success: true, message: 'Successfully logged out' });
      });
    }
  },


  getUsers(req, res) {
    if (req.query.limit && req.query.offset) {
      User.findAll({ offset: req.query.offset, limit: req.query.limit }).then((users) => {
        res.send({ success: true, message: users });
      });
    } else if (req.query.limit) {
      User.findAll({ limit: req.query.limit }).then((users) => {
        res.send({ success: true, message: users });
      });
    } else if (req.query.offset) {
      User.findAll({ offset: req.query.offset }).then((users) => {
        res.send({ success: true, message: users });
      });
    } else {
      User.findAll().then((users) => {
        allUsers = users;
        res.send({ success: true, message: users });
      }).catch((err) => {
        res.status(500).send({ success: false, message: 'Unexpected error occured' });
      });
    }
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
            }).then((count, row) => {
              res.send({ success: true, message: 'Details Updated Successfully' });
            });
          } else {
            res.status(400).send({ success: false, message: 'Incorrect Old Password' });
          }
        });
      } else if (req.body.username) {
        user.update({ username: req.body.username }).then((count, row) => {
          res.send({ success: true, message: 'Name Updated Successfully' });
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
        filtered = fil.filter((user) => {
          return user.username.includes(searchItem);
        });
        res.send({ success: true, message: filtered });
      } else {
        res.send({ success: true, message: allUsers });
      }
    } else {
      res.send({ success: true, message: allUsers });
    }
  }
};

export default Users;

