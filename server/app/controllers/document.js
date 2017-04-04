import index from '../models/index';

const Document = index.Document;
const User = index.User;
const Role = index.Role;
let accessibleDocuments = [];

const Documents = {
  create(req, res) {
    Document.create({
      title: req.body.title || null,
      content: req.body.content || null,
      access: req.body.access || 'Public',
      userId: req.decoded.id
    }).then((createdDocument) => {
      res.send({ success: true, message: 'Document added Successfully', createdDocument });
    }, (error) => {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).send({ success: false, message: error.message });
      } else if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).send({ success: false, message: 'Title must be unique' });
      } else {
        res.status(400).send({ success: false, message: 'Unexpected error occured' });
      }
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  getRoleAccess(req, res) {
    const roleDocuments = [];
    const callback = () => {
      accessibleDocuments = roleDocuments;
      res.send({ success: true, message: roleDocuments });
    };
    Document.findAll({ where: { access: 'Role' }, include: [{ model: User }] }).then((documents) => {
      if (documents) {
        documents.forEach((doc, indx) => {
          if (req.decoded.roleId == doc.User.roleId && doc.User.id != req.decoded.id) {
            roleDocuments.push(doc);
          }
          if (indx === documents.length - 1) {
            callback();
          }
        });
      } else {
        callback();
      }
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  getDocuments(req, res) {
    if (req.query.limit && req.query.offset) {
      Document.findAll({ offset: req.query.offset, limit: req.query.limit, include: [{ model: User }] }).then((documents) => {
        res.send({ success: true, message: documents });
      });
    } else if (req.query.limit) {
      Document.findAll({ limit: req.query.limit }).then((documents) => {
        res.send({ success: true, message: documents });
      });
    } else if (req.query.offset) {
      Document.findAll({ offset: req.query.offset }).then((documents) => {
        res.send({ success: true, message: documents });
      });
    } else {
      Document.findAll({ include: [{ model: User }] }).then((documents) => {
        accessibleDocuments = documents;
        res.send({ success: true, message: documents });
      }).catch((err) => {
        res.status(500).send({ success: false, message: 'Unexpected error occured' });
      });
    }
  },

  findDocument(req, res) {
    Document.findById(req.params.id).then((foundDocument) => {
      res.send({ success: true, message: foundDocument });
    }, (error) => {
      if (!req.params.id) {
        res.status(500).send({ success: false, message: 'Document Id required' });
      }
    }).catch((error) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  updateDocument(req, res) {
    const roleId = req.decoded.roleId;
    Role.findById(roleId).then((role) => {
      Document.findById(req.params.id).then((foundDocument) => {
        if (foundDocument.userId === req.decoded.id || role.category === 'SuperAdmin' || role.category === 'Admin') {
          foundDocument.update({
            title: req.body.title || foundDocument.title,
            content: req.body.content || foundDocument.content,
            access: req.body.access || foundDocument.access
          }).then((row) => {
            res.send({ success: true, message: 'Document updated Successfully' });
          }, (error) => {
            if (error.name === 'SequelizeUniqueConstraintError') {
              res.status(400).send({ success: false, message: 'Invalid Title' });
            } else {
              res.status(400).send({ success: false, message: 'Unexpected error occured' });
            }
          });
        } else {
          res.send({ success: false, message: 'You do not have permission to update this Document' });
        }
      }).catch((error) => {
        res.status(500).send({ success: false, message: 'Unexpected error occured' });
      });
    });
  },

  deleteDocument(req, res) {
    const roleId = req.decoded.roleId;
    Role.findById(roleId).then((role) => {
      Document.findById(req.params.id).then((foundDocument) => {
        if (foundDocument.userId === req.decoded.id || role.category === 'SuperAdmin' || role.category === 'Admin') {
          foundDocument.destroy().then((deleted) => {
            if (deleted) {
              res.send({ success: true, message: 'Document deleted Successfully' });
            }
          });
        } else {
          res.send({ success: false, message: 'You do not have permission to delete this Document' });
        }
      }, (error) => {
        if (!req.params.id) {
          res.status(400).send({ success: false, message: 'Document Id required' });
        }
      }).catch((err) => {
        res.status(500).send({ success: false, message: 'Unexpected error occured' });
      });
    });
  },

  findUserDocument(req, res) {
    Document.findAll({
      where: {
        userId: req.params.id
      },
      include: [{ model: User }]
    }).then((userDocuments) => {
      if (userDocuments) {
        accessibleDocuments = userDocuments;
        res.send({ success: true, message: userDocuments });
      }
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  publicDocument(req, res) {
    Document.findAll({ where: { access: 'Public' }, include: [{ model: User }] }).then((documents) => {
      if (documents) {
        accessibleDocuments = documents;
        res.send({ success: true, message: documents });
      } else {
        res.send({ success: true, message: [] });
      }
    }).catch((err) => {
      res.status(500).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  userDocument(req, res) {
    const roleDocuments = [];
    const callback = () => {
      accessibleDocuments = roleDocuments;
      res.send({ success: true, message: roleDocuments });
    };
    Document.findAll({ where: { $or: [{ access: 'Public' }, { access: 'Role' }, { userId: req.decoded.id }] }, include: [{ model: User }] }).then((documents) => {
      if (documents) {
        documents.forEach((doc, indx) => {
          if (req.decoded.roleId == doc.User.roleId) {
            roleDocuments.push(doc);
          }
          if (indx === documents.length - 1) {
            callback();
          }
        });
      } else {
        callback();
      }
    }).catch((err) => {
      res.status(503).send({ success: false, message: 'Unexpected error occured' });
    });
  },

  searchDocument(req, res) {
    if (req.query.title) {
      let searchItem = req.query.title;
      let filtered = [];
      searchItem = searchItem.trim();
      const fil = accessibleDocuments;
      if (searchItem.length > 0) {
        filtered = fil.filter((doc) => {
          return doc.title.includes(searchItem);
        });
        res.send({ success: true, message: filtered });
      } else {
        res.send({ success: true, message: accessibleDocuments });
      }
    } else {
      res.send({ success: true, message: accessibleDocuments });
    }
  }
};

export default Documents;
