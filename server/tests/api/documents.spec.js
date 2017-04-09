import request from 'supertest';
import chai from 'chai';
import app from '../../../serverTools/server';

const expect = chai.expect;
describe('Document Test Suite: ', () => {
  let userToken, adminToken, userToken2;
  describe('Create Document:', () => {
    it('login to create a document', (done) => {
      request(app)
        .post('/users/login')
        .send({
          username: 'FissySecond',
          password: 'fissySecond'
        })
        .end((err, res) => {
          userToken = res.body.token;
          expect(userToken).to.not.be.undefined;
          expect(res.body.message).to.be.equal('Successfully logged in');
          done();
        });
    }).timeout(10000);

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
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Document created Successfully');
          done();
        });
    }).timeout(10000);

    it('throw error if creating document with same title', (done) => {
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
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Title exists');
          done();
        });
    }).timeout(10000);
  });


  describe('Retrieve Document:', () => {
    it('asserts that an authenticated user can see all shared documents ', (done) => {
      request(app)
        .get('/role/documents')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(302);
          const documents = res.body.documents;
          expect(documents).to.be.instanceof(Array);
          documents.forEach((doc) => {
            expect(doc.access).to.not.be.undefined;
            expect(doc.id).to.be.a('number');
            expect(doc.content).to.be.a('string');
          });
          done();
        });
    }).timeout(10000);

    it('Log in as SuperAdmin/Admin, get a token before all documents can be retrieved ', (done) => {
      request(app)
        .post('/users/login')
        .send({
          username: 'fissyAdmin',
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
          expect(res.status).to.equal(200);
          expect(res.body.documents).to.be.instanceof(Array);
          done();
        });
    });

    it('User can see all accessible Documents', (done) => {
      request(app)
        .get('/user/documents')
        .set('x-access-token', userToken)
        .end((err, res) => {
          const documents = res.body.documents;
          expect(documents).to.be.instanceof(Array);
          documents.forEach((doc) => {
            expect(doc.access).to.be.a('string');
            expect(doc.id).to.be.a('number');
          });
          done();
        });
    });

    it('asserts that authenticated user can search for a document', (done) => {
      request(app)
        .get(`/search/documents?title=${3}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.body.documents).to.be.instanceof(Array);
          res.body.documents.forEach((doc) => {
            expect(doc.title).to.be.a('string');
          });
          done();
        });
    });

    it('asserts that an authenticated user can see all public documents', (done) => {
      request(app)
        .get('/public/documents')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.body.documents).to.be.instanceof(Array);
          done();
        });
    });

    it('asserts that authenticated user can see details of a selected document', (done) => {
      request(app)
        .get(`/documents/${3}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          const foundDocument = res.body;
          expect(foundDocument).to.be.instanceof(Object);
          expect(foundDocument.id).to.be.a('number');
          expect(foundDocument.access).to.be.a('string');
          done();
        });
    });

    it('Super Admin/Owner can retrieve all Documents belonging to a user', (done) => {
      request(app)
        .get(`/users/${3}/documents?`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          const documents = res.body.documents;
          expect(documents).to.be.instanceof(Array);
          documents.forEach((doc) => {
            expect(doc.access).to.be.a('string');
            expect(doc.id).to.be.a('number');
          });
          done();
        });
    });
  });

  describe('Update Document:', () => {
    it('Admin/SuperAdmin can edit a user document', (done) => {
      request(app)
        .put(`/documents/${3}`)
        .set('x-access-token', adminToken)
        .send({
          title: 'BoluDoc4',
          access: 'Role',
          content: 'I want to edit this Document',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Document updated Successfully');
          done();
        });
    });

    it('document remains same if no values was passed while updating', (done) => {
      request(app)
        .put(`/documents/${3}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.body.message).to.equal('Document updated Successfully');
          done();
        });
    });

    it('checks that an authenticated user can update his/her document', (done) => {
      request(app)
        .put(`/documents/${3}`)
        .set('x-access-token', userToken)
        .send({
          title: 'BoluDoc4',
          access: 'Role',
          content: 'I just edited my Document',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Document updated Successfully');
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
          password: 'fissyFirst',
        })
        .end((err, res) => {
          userToken2 = res.body.token;
          expect(userToken2).to.not.be.undefined;
          expect(res.body.message).to.be.equal('Successfully logged in');
          done();
        });
    });

    it('checks that only the Super Admin or owner of a Document can delete the document', (done) => {
      request(app)
        .delete(`/documents/${3}`)
        .set('x-access-token', userToken2)
        .end((err, res) => {
          expect(res.body.message).to.equal('You do not have permission to delete this Document');
          done();
        });
    });


    it('Document can be deleted by the Owner', (done) => {
      request(app)
        .delete(`/documents/${3}`)
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.body.message).to.equal('Document deleted Successfully');
          done();
        });
    });
  });
});
