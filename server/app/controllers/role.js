import index from '../models/index';

const Role = index.Role;

const Roles = {
  create(req, res) {
    Role.create({
      category: req.body.category || null
    }).then((createdRole) => {
      res.send({ success: true, message: 'Role created Successfully', createdRole });
    }, (error) => {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).send({ success: false, message: error.message });
      } else if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).send({ success: false, message: 'Category exists' });
      } else {
        res.status(400).send({ success: false, message: 'Unexpected error occured' });
      }
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  getUserRoles(req, res) {
    Role.findAll().then((roles) => {
      const newRow = [];
      roles.forEach((row) => {
        if (row.category !== 'SuperAdmin' && row.category !== 'Admin') { newRow.push(row); }
      });
      res.send({ success: true, message: newRow });
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  getRoles(req, res) {
    Role.findAll().then((roles) => {
      res.send({ success: true, message: roles });
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  deleteRole(req, res){
    Role.findById(req.params.id).then((role) => {
      role.destroy().then((deleted) => {
        res.send({ success: true, message: 'Role deleted Successfully' });
      });
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  }
};

export default Roles;

