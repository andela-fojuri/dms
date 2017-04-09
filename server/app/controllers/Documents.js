import index from '../models/index';

const Document = index.Document;
const User = index.User;
const Role = index.Role;
let accessibleDocuments = [];

const Documents = {
  create(req, res) {
    Document.findOne({ where: { title: req.body.title } }).then((foundDocument) => {
      if (foundDocument) {
        return res.status(409).send({ message: 'Title exists' });
      }
      Document.create({
        title: req.body.title || null,
        content: req.body.content || null,
        access: req.body.access || 'Public',
        userId: req.decoded.id
      }).then((createdDocument) => {
        res.send({ message: 'Document created Successfully' });
      }, (error) => {
        res.status(401).send({ message: 'Unexpected error occured' });
      }).catch((err) => {
        res.status(501).send({ message: 'Unexpected error occured' });
      });
    });
  },

  getRoleAccess(req, res) {
    Document.findAndCountAll({
      offset: req.query.offset || 0,
      limit: req.query.limit || 50,
      order: '"createdAt" DESC',
      where: { $and: [{ access: 'Role' }, { $not: { userId: req.decoded.id } }] },
      include: [{
        model: User,
        where: { roleId: req.decoded.roleId },
        attributes: { exclude: ['password_digest', 'roleId', 'createdAt', 'updatedAt'] }
      }]
    }).then((response) => {
      accessibleDocuments = response.rows;
      res.send({ documents: response.rows, count: response.count });
    }).catch((err) => {
      res.status(500).send({ message: 'Unexpected error occured' });
    });
  },

  getDocuments(req, res) {
    Document.findAndCountAll({
      offset: req.query.offset || 0,
      limit: req.query.limit || 50,
      order: '"createdAt" DESC',
      include: [{
        model: User,
        attributes: { exclude: ['password_digest', 'roleId', 'createdAt', 'updatedAt'] }
      }]
    })
      .then((response) => {
        accessibleDocuments = response.rows;
        res.send({ documents: response.rows, count: response.count });
      });
  },

  findDocument(req, res) {
    Document.findById(req.params.id).then((foundDocument) => {
      res.send(foundDocument);
    }, (error) => {
      res.status(500).send({ message: 'Unexpected error occured' });
    }).catch((error) => {
      res.status(500).send({ message: 'Unexpected error occured' });
    });
  },

  updateDocument(req, res) {
    const roleId = req.decoded.roleId;
    Role.findById(roleId).then((role) => {
      Document.findById(req.params.id).then((foundDocument) => {
        if (Number(foundDocument.userId) === Number(req.decoded.id)
          || role.category === 'SuperAdmin'
          || role.category === 'Admin') {
          foundDocument.update({
            title: req.body.title || foundDocument.title,
            content: req.body.content || foundDocument.content,
            access: req.body.access || foundDocument.access
          }).then((document) => {
            res.send({ message: 'Document updated Successfully' });
          }, (error) => {
            if (error.name === 'SequelizeUniqueConstraintError') {
              res.status(409).send({ message: 'Invalid Title' });
            } else {
              res.status(401).send({ message: 'Unexpected error occured' });
            }
          });
        } else {
          res.status(401).send({ message: 'You do not have permission to update this Document' });
        }
      }).catch((error) => {
        res.status(501).send({ message: 'Unexpected error occured' });
      });
    });
  },

  deleteDocument(req, res) {
    const roleId = req.decoded.roleId;
    Role.findById(roleId).then((role) => {
      Document.findById(req.params.id).then((foundDocument) => {
        if (foundDocument.userId === req.decoded.id
          || role.category === 'SuperAdmin'
          || role.category === 'Admin') {
          foundDocument.destroy().then((deleted) => {
            if (deleted) {
              res.status(200).send({ message: 'Document deleted Successfully' });
            }
          });
        } else {
          res.status(401).send({ message: 'You do not have permission to delete this Document' });
        }
      }, (error) => {
        if (!req.params.id) {
          res.status(401).send({ message: 'Document Id required' });
        }
      }).catch((err) => {
        res.status(501).send({ message: 'Unexpected error occured' });
      });
    });
  },

  findUserDocument(req, res) {
    Document.findAndCountAll({
      offset: req.query.offset || 0,
      limit: req.query.limit || 50,
      order: '"createdAt" DESC',
      where: {
        userId: req.params.id
      },
      include: [{
        model: User,
        attributes: { exclude: ['password_digest', 'roleId', 'createdAt', 'updatedAt'] }
      }]
    }).then((response) => {
      if (response) {
        accessibleDocuments = response.rows;
        res.send({ documents: response.rows, count: response.count });
      }
    }).catch((err) => {
      res.status(500).send({ message: 'Unexpected error occured' });
    });
  },

  publicDocument(req, res) {
    Document.findAndCountAll({
      offset: req.query.offset || 0,
      limit: req.query.limit || 50,
      where: { access: 'Public' },
      order: '"createdAt" DESC',
      include: [{
        model: User,
        attributes: { exclude: ['password_digest', 'roleId', 'createdAt', 'updatedAt'] }
      }]
    }).then((response) => {
      if (response) {
        accessibleDocuments = response.rows;
        res.send({ documents: response.rows, count: response.count });
      } else {
        res.send({ documents: [], count: 0 });
      }
    }).catch((err) => {
      res.status(500).send({ message: 'Unexpected error occured' });
    });
  },

  userDocument(req, res) {
    let count = 0;
    Document.findAndCountAll({
      offset: req.query.offset || 0,
      limit: req.query.limit || 50,
      order: '"createdAt" DESC',
      where: {
        $or: [{ access: 'Public' },
        { access: 'Role' }, { userId: req.decoded.id }]
      },
      include: [{
        model: User,
        where: { roleId: req.decoded.roleId },
        attributes: { exclude: ['password_digest', 'roleId', 'createdAt', 'updatedAt'] }
      }]
    }).then((response) => {
      count = response.count;
      if (response) {
        accessibleDocuments = response.rows;
        count = response.count;
        res.send({ documents: response.rows, count: response.count });
      }
    }).catch((err) => {
      res.status(503).send({ message: 'Unexpected error occured' });
    });
  },

  searchDocument(req, res) {
    if (req.query.title) {
      let searchItem = req.query.title;
      let filtered = [];
      searchItem = searchItem.trim();
      const fil = accessibleDocuments;
      if (searchItem.length > 0) {
        filtered = fil.filter(doc => doc.title.includes(searchItem));
        res.send({ documents: filtered, count: filtered.length });
      } else {
        res.send({ documents: accessibleDocuments, count: accessibleDocuments.length });
      }
    } else {
      res.send({ documents: accessibleDocuments, count: accessibleDocuments.length });
    }
  }
};


export default Documents;
