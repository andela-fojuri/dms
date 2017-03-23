import request from 'supertest';
import chai from 'chai';
import assert from 'assert';
import app from '../../../serverTools/server';
import userDetails from '../helper/user';

const expect = chai.expect;
process.env.NODE_ENV = 'test';

describe('Role Test Suite: ', () => {
  let userToken, adminToken, role;
  describe('Create Role:', () => {
    it('login as a user and try to create a Role', (done) => {
      request(app)
      .post('/users/login')
      .send({
        username: 'FissyFirst',
        password: 'fissyfirst',
      })
      .end((err, res) => {
        userToken = res.body.token;
        expect(userToken).to.not.be.undefined;
        expect(res.body.success).to.be.equal('Successfully logged in');
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
        username: 'Fissy',
        password: 'fissyAdmin',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        expect(adminToken).to.not.be.undefined;
        expect(res.body.success).to.be.equal('Successfully logged in');
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
        role = res.body;
        expect(role.success).to.equal('Role created Successfully');
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
        role = res.body;
        expect(role.success).to.equal('Role created Successfully');
        done();
      });
    });

    it('Only Super admin can retieve all created roles', (done) => {
      request(app)
      .get('/roles')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Not authenticated as Super Admin');
        done();
      });
    });

    it('A Super Admin can retieve all created roles', (done) => {
      request(app)
      .get('/roles')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body).to.be.instanceof(Array);
        res.body.forEach((roles) => {
          expect(roles.category).to.be.a('string');
        });
        done();
      });
    });

    it('Only a Super Admin can delete a role', (done) => {
      request(app)
      .delete(`/roles/id?roleId=${role.createdRole.id}`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Not authenticated as Super Admin');
        done();
      });
    });

    it('Super Admin can delete a role', (done) => {
      request(app)
      .delete(`/roles/id?roleId=${role.createdRole.id}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.success).to.equal('Role deleted Successfully');
        done();
      });
    });
  });
});