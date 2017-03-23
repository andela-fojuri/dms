import request from 'supertest';
import chai from 'chai';
import assert from 'assert';
import app from '../../../serverTools/server';
import userDetails from '../helper/user';

process.env.NODE_ENV = 'test';

const expect = chai.expect;
describe('Document Test Suite: ', () => {
  let userToken, adminToken, document, userToken2;
  describe('Create Document:', () => {
    it('User must be logged in to create a document', (done) => {
      request(app)
      .post('/documents')
      .send({
        title: 'BoluDoc3',
        access: 'Role',
        content: 'I have a third Document',
        userId: request('decoded.id'),
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not authenticated');
        done();
      });
    });

    it('login to create a document', (done) => {
      request(app)
      .post('/users/login')
      .send({
        username: 'FissySecond',
        password: 'fissysecond'
      })
      .end((err, res) => {
        userToken = res.body.token;
        expect(userToken).to.not.be.undefined;
        expect(res.body.success).to.be.equal('Successfully logged in');
        done();
      });
    });

    it('Authenticated User can create a document', (done) => {
      request(app)
      .post('/documents')
      .set('x-access-token', userToken)
      .send({
        title: 'randomDoc',
        access: 'Role',
        content: 'I have a random Document',
        userId: request('decoded.id'),
      })
      .end((err, res) => {
        document = res.body;
        expect(res.status).to.equal(200);
        expect(document.success).to.equal('Document added Successfully');
        done();
      });
    });
  });

  describe('Retrieve Document:', () => {
    it('asserts that an authenticated user can see all documents accessible to the user', (done) => {
      request(app)
      .get('/documents/role')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.document).to.be.instanceof(Array);
        res.body.document.forEach((doc) => {
          expect(doc.access).to.not.be.undefined;
          expect(doc.id).to.be.a('number');
          expect(doc.content).to.be.a('string');
        });
        done();
      });
    });

    it('checks if user is authenticated as Super Admin to see list of documents', (done) => {
      request(app)
      .get('/documents')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Not authenticated as Super Admin');
        done();
      });
    });

    it('Log in as SuperAdmin/Admin, get a token before all documents can be retrieved ', (done) => {
      request(app)
      .post('/users/login')
      .send({
        username: 'Fissy',
        password: 'fissyAdmin',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        expect(adminToken).to.not.be.undefined;
        done();
      });
    });

    it('asserts that only SuperAdmin/Admin can see list of all created documents', (done) => {
      request(app)
      .get('/documents')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.document).to.be.instanceof(Array);
        done();
      });
    });

    it('asserts that authenticated user can search for a document', (done) => {
      request(app)
      .get(`/search/documents?title=${document.createdDocument.title}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message).to.be.instanceof(Object);
        expect(res.body.message.title).to.be.a('string');
        done();
      });
    });

    it('asserts that all created documents has a public date defined', (done) => {
      request(app)
      .get('/documents')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.document).to.be.instanceof(Array);
        res.body.document.forEach((doc) => {
          expect(doc.createdAt).to.be.a('string');
        });
        done();
      });
    });

    it('asserts that an authenticated user can see all public documents', (done) => {
      request(app)
      .get('/documents/user')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.document).to.be.instanceof(Array);
        done();
      });
    });

    it('asserts that authenticated user can see details of a selected document', (done) => {
      request(app)
      .get(`/documents/id?id=${document.createdDocument.id}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.document).to.be.instanceof(Object);
        expect(res.body.document.id).to.be.a('number');
        expect(res.body.document.access).to.be.a('string');
        done();
      });
    });

    it('Only Super Admin can retrieve all Documents belonging to a user', (done) => {
      request(app)
      .get(`/users/id/documents?userId=${document.createdDocument.userId}`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Not authenticated as Super Admin');
        done();
      });
    });

    it('Super Admin can retrieve all Documents belonging to a user', (done) => {
      request(app)
      .get(`/users/id/documents?userId=${document.createdDocument.userId}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.document).to.be.instanceof(Array);
        res.body.document.forEach((doc) => {
          expect(doc.access).to.be.a('string');
          expect(doc.id).to.be.a('number');
        });
        done();
      });
    });

    // it('All Documents of a user can be retrieved once the user logs in', (done) => {
    //   request(app)
    //   .get('/users/documents')
    //   .set('x-access-token', userToken)
    //   .end((err, res) => {
    //     expect(res.body.document).to.be.instanceof(Array);
    //     res.body.document.forEach((doc) => {
    //       expect(doc.access).to.be.a('string');
    //       expect(doc.id).to.be.a('number');
    //     });
    //     done();
    //   });
    // });
  });

  describe('Update Document:', () => {
    it('Only owner of a Document can update the document', (done) => {
      request(app)
      .put(`/documents/id?id=${document.createdDocument.id}`)
      .set('x-access-token', adminToken)
      .send({
        title: 'BoluDoc4',
        access: 'Role',
        content: 'I want to edit this Document',
      })
      .end((err, res) => {
        expect(res.body.failure).to.equal('This Document is not yours and cannot be edited by you');
        done();
      });
    });

    it('checks that an authenticated user can update his/her document', (done) => {
      request(app)
      .put(`/documents/id?id=${document.createdDocument.id}`)
      .set('x-access-token', userToken)
      .send({
        title: 'BoluDoc4',
        access: 'Role',
        content: 'I just edited my Document',
      })
      .end((err, res) => {
        expect(res.body.success).to.equal('Document updated Successfully');
        done();
      });
    });
  });

  describe(' Delete Document:', () => {
    it('login to delete a document', (done) => {
      request(app)
      .post('/users/login')
      .send({
        username: 'FissyFirst',
        password: 'fissyfirst',
      })
      .end((err, res) => {
        userToken2 = res.body.token;
        expect(userToken2).to.not.be.undefined;
        expect(res.body.success).to.be.equal('Successfully logged in');
        done();
      });
    });

    it('checks that only the Super Admin or owner of a Document can delete the document', (done) => {
      request(app)
      .delete(`/documents/id?id=${document.createdDocument.id}`)
      .set('x-access-token', userToken2)
      .end((err, res) => {
        expect(res.body.failure).to.equal('You do not have permission to delete this Document');
        done();
      });
    });


    it('Document can be deleted by the Owner', (done) => {
      request(app)
      .delete(`/documents/id?id=${document.createdDocument.id}`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.success).to.equal('Document deleted Successfully');
        done();
      });
    });
  });
});
