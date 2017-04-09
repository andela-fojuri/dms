
import request from 'supertest';
import chai from 'chai';
import app from '../../../serverTools/server';

const expect = chai.expect;

let userToken;
describe('Retieve User:', () => {
  it('asserts that a user can log in and get a token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        username: 'FissySecond',
        password: 'fissySecond',
      })
      .end((err, res) => {
        userToken = res.body.token;
        expect(userToken).to.not.be.undefined;
        expect(res.body.message).to.equal('Successfully logged in');
        done();
      });
  });

  it('checks if user is authenticated as Super Admin to see list of other users', (done) => {
    request(app)
      .get('/users')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Not authenticated as Super Admin');
        done();
      });
  });

  it('checks that only a SuperAdmin/Admin can delete a user', (done) => {
    request(app)
      .delete(`/users/${4}`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Not authenticated as Super Admin');
        done();
      });
  });

  it('Only a Super Admin can delete a role', (done) => {
    request(app)
      .delete(`/roles/${3}`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Not authenticated as Super Admin');
        done();
      });
  });
});

describe('Document Test Suite: ', () => {
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
});
