import index from '../models/index';

const Document = index.Document;
const User = index.User;
const Role = index.Role;
let roleAccess = [];
let userDocuments = [];
let allDocuments = [];
const Documents = {
  create: ((req, res) => {
    if (req.body.title && req.body.content && req.decoded.id) {
      Document.findOne({ where: { title: req.body.title, userId: req.decoded.id } }).then((document) => {
        if (document) {
          res.send({ alert: 'Docuement exist, Do you want to overrite? ' });
        } else {
          Document.create({ title: req.body.title,
            content: req.body.content,
            access: req.body.access || 'Public',
            userId: req.decoded.id
          }).then((createdDocument) => {
            if (createdDocument) {
              res.send({ success: 'Document added Successfully', createdDocument });
            } else {
              res.send({ failure: 'Cannot create document' });
            }
          });
        }
      });
    } else {
      res.send({ failure: 'All fields must be filled' });
    }
  }),

  getRoleAccess: ((req, res) => {
    if (req.decoded) {
      const roleDocuments = [];
      const callback = () => {
        roleAccess = roleDocuments;
        res.send({ success: true, document: roleDocuments });
      };
      Document.findAll({ where: { access: 'Role' } }).then((documents) => {
        documents.forEach((doc, index) => {
          User.find({ where: { id: doc.userId } }).then((owner) => {
            if (req.decoded.roleId == owner.roleId && owner.id != req.decoded.id) {
              roleDocuments.push(doc);
            }
            if (index === documents.length - 1) {
              callback();
            }
          }).catch((err) => {
            res.send({ failure: 'User not found' });
          });
        });
      }).catch((err) => {
        res.send({ failure: 'No Role Documents available' });
      });
    }
  }),


  getDocuments: ((req, res) => {
    if (req.query.limit && req.query.offset) {
      Document.findAll({ offset: req.query.offset, limit: req.query.limit }).then((documents) => {
        if (documents) {
          res.send({ success: true, document: documents });
        } else {
          res.send({ failure: 'No Document found' });
        }
      });
    } else if (req.query.limit) {
      Document.findAll({ limit: req.query.limit }).then((documents) => {
        if (documents) {
          res.send({ success: true, document: documents });
        } else {
          res.send({ failure: 'No Document found' });
        }
      });
    } else if (req.query.offset) {
      Document.findAll({ offset: req.query.offset }).then((documents) => {
        if (documents) {
          res.send({ success: true, document: documents });
        } else {
          res.send({ failure: 'No Document found' });
        }
      });
    } else {
      Document.findAll().then((documents) => {
        if (documents) {
          allDocuments = documents;
          res.send({ success: true, document: documents });
        } else {
          res.send({ failure: 'No Document found' });
        }
      });
    }
  }),
  findDocument: ((req, res) => {
    if (req.query.id) {
      Document.findById(req.query.id).then((foundDocument) => {
        if (foundDocument) {
          res.send({ success: true, document: foundDocument });
        } else {
          res.send({ failure: 'Document not found' });
        }
      });
    } else {
      res.send({ failure: 'Kindly provide an ID' });
    }
  }),

  updateDocument: ((req, res) => {
    if (req.query.id && req.decoded.id) {
      Document.findById(req.query.id).then((foundDocument) => {
        if (req.decoded.id == foundDocument.userId) {
          foundDocument.update({ title: req.body.title || foundDocument.title,
            content: req.body.content || foundDocument.content,
            access: req.body.access || foundDocument.access }).then((row) => {
              res.send({ success: 'Document updated Successfully' });
            }).catch((err) => {
              res.send({ failure: 'Unable to update Document at this time' });
            });
        } else {
          res.send({ failure: 'This Document is not yours and cannot be edited by you' });
        }
      });
    } else {
      res.send({ failure: 'Document and UserId required' });
    }
  }),

  deleteDocument: ((req, res) => {
    if (req.query.id && req.decoded) {
      const roleId = req.decoded.roleId;
      Role.findById(roleId).then((role) => {
        Document.findById(req.query.id).then((foundDocument) => {
          if (foundDocument.userId == req.decoded.id || role.category === 'SuperAdmin' || role.category === 'Admin') {
            foundDocument.destroy().then((deleted) => {
              if (deleted) {
                res.send({ success: 'Document deleted Successfully' });
              }
            });
          } else {
            res.send({ failure: 'You do not have permission to delete this Document' });
          }
        }).catch((err) => {
          res.send({ failure: 'Document not found' });
        });
      });
    } else {
      res.send({ failure: 'No ID provided' });
    }
  }),

  findUserDocument: ((req, res) => {
    if (req.query.userId) {
      Document.findAll({ where: { userId: req.query.userId } }).then((userDocuments) => {
        if (userDocuments) {
          res.send({ success: true, document: userDocuments });
        } else {
          res.send({ failure: 'Unable to fectch Documents' });
        }
      });
    } else {
      res.send({ failure: 'ID required' });
    }
  }),


  userPublicDocument: ((req, res) => {
    if (req.decoded.id) {
      Document.findAll({ where: { $or: [{ userId: req.decoded.id }, { access: 'Public' }] } }).then((documents) => {
        if (documents) {
          userDocuments = documents;
          res.send({ success: true, document: documents });
        } else {
          res.send({ failure: 'No Document found' });
        }
      });
    } else {
      res.send({ failure: 'ID required' });
    }
  }),

  searchDocument: ((req, res) => {
    let accessibleDocuments = [];
    let found;
    if (req.query.title) {
      accessibleDocuments = accessibleDocuments.concat(allDocuments, roleAccess, userDocuments);
      accessibleDocuments.forEach((document) => {
        if (req.query.title === document.title) {
          res.send({ success: true, message: document });
          found = true;
        }
      });
      if (!found) {
        res.send({ success: false, message: 'Document not found' });
      }
    } else {
      res.send({ success: false, message: 'Field cannot be empty' });
    }
  })
};

export default Documents;
