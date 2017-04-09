import request from 'supertest';
import chai from 'chai';
import assert from 'assert';
import app from '../../../serverTools/server';
import userDetails from '../helper/user';

const expect = chai.expect;
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

describe('Role Test Suite: ', () => {
  let userToken, adminToken;
  describe('Create Role:', () => {
    it('login as a user and try to create a Role', (done) => {
      request(app)
      .post('/users/login')
      .send({
        username: 'FissyFirst',
        password: 'fissyFirst',
      })
      .end((err, res) => {
        userToken = res.body.token;
        expect(userToken).to.not.be.undefined;
        expect(res.body.message).to.be.equal('Successfully logged in');
        done();
      });
    });

    it('Only a Super Admin can create a new Role', (done) => {
      request(app)
      .post('/roles')
      .set('x-access-token', userToken)
      .send({
        category: 'NewRole'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Not authenticated as Super Admin');
        done();
      });
    });


    it('Log in as SuperAdmin/Admin, before a role can be created ', (done) => {
      request(app)
      .post('/users/login')
      .send({
        username: 'fissyAdmin',
        password: 'fissyAdmin',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        expect(adminToken).to.not.be.undefined;
        expect(res.body.message).to.be.equal('Successfully logged in');
        done();
      });
    });

    it('A Super admin can create new Role', (done) => {
      request(app)
      .post('/roles')
      .set('x-access-token', adminToken)
      .send({
        category: 'NewRole'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Role created Successfully');
        done();
      });
    });

    it('A Super admin can create another Role', (done) => {
      request(app)
      .post('/roles')
      .set('x-access-token', adminToken)
      .send({
        category: 'NewRole2'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Role created Successfully');
        done();
      });
    });

    it('should throw error if trying to created role with same name', (done) => {
      request(app)
      .post('/roles')
      .set('x-access-token', adminToken)
      .send({
        category: 'NewRole2'
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('Category exists');
        done();
      });
    });

    it('should throw error if trying to created role with no value', (done) => {
      request(app)
      .post('/roles')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });


    it('A Super Admin can retieve all created roles', (done) => {
      request(app)
      .get('/roles')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body).to.be.instanceof(Array);
        res.body.forEach((role) => {
          expect(role.category).to.be.a('string');
        });
        done();
      });
    });

    it('Super Admin can edit a Role', (done) => {
      request(app)
      .put(`/roles/${4}`)
      .send({
        category: 'NewRoleUpdated'
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Role Updated Successfully');
        done();
      });
    });

    it('Super Admin can delete a role', (done) => {
      request(app)
      .delete(`/roles/${4}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Role deleted Successfully');
        done();
      });
    });
  });
});
