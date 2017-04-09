import index from '../models/index';

const Role = index.Role;

const Roles = {
  create(req, res) {
    Role.findOne({ where: { category: req.body.category } }).then((foundRole) => {
      if (foundRole) {
        return res.status(409).send({ message: 'Category exists' });
      }
      Role.create({
        category: req.body.category || null
      }).then(() => {
        res.send({ message: 'Role created Successfully' });
      }, (error) => {
        if (error.name === 'SequelizeValidationError') {
          res.status(400).send({ message: error.message });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
          res.status(400).send({ message: 'Category exists' });
        } else {
          res.status(401).send({ message: 'Unexpected error occured' });
        }
      });
    }).catch((err) => {
      res.status(501).send({ message: 'Unexpected error occured' });
    });
  },

  getRoles(req, res) {
    Role.findAll().then((roles) => {
      res.send(roles);
    }).catch((err) => {
      res.status(500).send({ message: 'Unexpected error occured' });
    });
  },

  updateRole(req, res) {
    Role.findById(req.params.id).then((foundRole) => {
      foundRole.update({ category: req.body.category || foundRole.category }).then((role) => {
        res.send({ message: 'Role Updated Successfully' });
      });
    }, (error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send({ message: 'Category exists' });
      } else {
        res.status(401).send({ message: 'Unexpected error occured' });
      }
    }).catch((err) => {
      res.status(501).send({ message: 'Unexpected error occured' });
    });
  },

  deleteRole(req, res) {
    const id = Number(req.params.id);
    if (id === 1 || id === 2 || id === 3) {
      res.send({ message: 'Selected Role cannot be deleted' });
    } else {
      Role.findById(req.params.id).then((role) => {
        role.destroy().then(() => {
          res.send({ message: 'Role deleted Successfully' });
        });
      }).catch((err) => {
        res.status(501).send({ message: 'Unexpected error occured' });
      });
    }
  }
};

export default Roles;

