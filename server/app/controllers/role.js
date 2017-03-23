import index from '../models/index';

const Role = index.Role;

const Roles = {
  create: ((req, res) => {
    if (req.body.category) {
      Role.findOne({ where: { category: req.body.category } }).then((role) => {
        if (role) {
          res.send({ failure: 'Role exists' });
        } else {
          Role.create({ category: req.body.category
          }).then((createdRole) => {
            if (createdRole) {
              res.send({ success: 'Role created Successfully', createdRole });
            } else {
              res.send({ failure: 'Cannot create Role' });
            }
          });
        }
      });
    } else {
      res.send({ failure: 'All fields must be filled' });
    }
  }),

  getUserRoles: ((req, res) => {
    Role.findAll().then((roles) => {
      const newRow = [];
      roles.forEach((row) => {
        if (row.category !== 'SuperAdmin' && row.category !== 'Admin') { newRow.push(row); }
      });
      res.send(newRow);
    }).catch((err) => {
      res.send({ failure: 'No role found' });
    });
  }),

  getRoles: ((req, res) => {
    Role.findAll().then((roles) => {
      res.send(roles);
    }).catch((err) => {
      res.send({ failure: 'No role found' });
    });
  }),

  deleteRole: ((req, res) => {
    if (req.query.roleId) {
      Role.findById(req.query.roleId).then((role) => {
        role.destroy().then((deleted) => {
          if (deleted) {
            res.send({ success: 'Role deleted Successfully' });
          } else {
            res.send({ success: 'Cannot delete role' });
          }
        });
      }).catch((err) => {
        res.send({ failure: 'Could not find Role' });
      });
    } else {
      res.send({ failure: 'No ID provided' });
    }
  })
};

export default Roles;

