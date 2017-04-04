import request from 'supertest';
import chai from 'chai';
import assert from 'assert';
import app from '../../../serverTools/server';
import userDetails from '../helper/user';

const expect = chai.expect;

let user;
describe('User Test Suite: ', () => {
  let user2, userToken, userToken2, adminToken;
  describe('Create User:', () => {
    it('checks if all fields were filled before creating a user', (done) => {
      request(app)
      .post('/users')
      .send(userDetails.user0)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('creates a new user', (done) => {
      request(app)
      .post('/users')
      .send(userDetails.user1)
      .end((err, res) => {
        user = res.body;
        expect(res.status).to.equal(200);
        expect(user.message).to.equal('User Created Successfully');
        done();
      });
    });


    it('checks if created user is unique', (done) => {
      request(app)
      .post('/users')
      .send({
        username: user.createdUser.username,
        email: user.createdUser.email,
        password: 'fissyTest2',
        password_confirmation: 'fissyTest2',
        roleId: 2
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('checks if createduser has a role', (done) => {
      expect(user.createdUser.roleId).to.not.be.undefined;
      expect(user.createdUser.roleId).to.be.a('number');
      done();
    });

    it('asserts that a  user cannot log in with wrong username/password', (done) => {
      request(app)
      .post('/users/login')
      .send({
        username: user.createdUser.username,
        password: 'fissyTe',
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Invalid Username/Password');
        done();
      });
    });

    it('asserts that a  user cannot log in without Sign Up', (done) => {
      request(app)
      .post('/users/login')
      .send({
        username: 'notSigned',
        password: 'fissyTe',
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('User Not Registered, Kindly signup to proceed');
        done();
      });
    });

    it('asserts that a user can log in and get a token', (done) => {
      request(app)
      .post('/users/login')
      .send({
        username: user.createdUser.username,
        password: 'fissyTest',
      })
      .end((err, res) => {
        userToken = res.body.token;
        expect(userToken).to.not.be.undefined;
        expect(res.body.message).to.equal('Successfully logged in');
        done();
      });
    });

    it('creates another user', (done) => {
      request(app)
      .post('/users')
      .send(userDetails.user2)
      .end((err, res) => {
        user2 = res.body;
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User Created Successfully');
        done();
      });
    });

    it('checks that second user also gets a token', (done) => {
      request(app)
      .post('/users/login')
      .send({
        username: user2.createdUser.username,
        password: 'fissyTest2',
      })
      .end((err, res) => {
        userToken2 = res.body.token;
        expect(userToken2).to.not.be.undefined;
        done();
      });
    });

    it('checks that authenticated user can logout', (done) => {
      request(app)
      .post('/users/logout')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Successfully logged out');
        done();
      });
    });

    it('asserts that a logged in SuperAdmin/Admin gets a token', (done) => {
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
  });

  describe('Retieve User:', () => {
    it('checks if user is authenticated as Super Admin to see list of other users', (done) => {
      request(app)
      .get('/users')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Not authenticated as Super Admin');
        done();
      });
    });

    it('asserts that SuperAdmin/Admin can see list of all users', (done) => {
      request(app)
      .get('/users')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message).to.be.instanceof(Array);
        done();
      });
    });

    it('asserts that SuperAdmin/Admin can search for a user', (done) => {
      request(app)
      .get(`/search/users?username=${user.createdUser.username}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message).to.be.instanceof(Object);
        expect(res.body.message.username).to.be.a('string');
        done();
      });
    });

    it('asserts that authenticated user can see profile of a selected user', (done) => {
      request(app)
      .get(`/users/${user.createdUser.id}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message).to.be.instanceof(Object);
        expect(res.body.message.id).to.be.a('number');
        expect(res.body.message.username).to.be.a('string');
        done();
      });
    });
  });
  describe('Update User:', () => {
    it('check that an authenticated user can update his/her profile with right details', (done) => {
      request(app)
      .put(`/users/${user.createdUser.id}`)
      .set('x-access-token', userToken)
      .send({
        username: 'FissyChange',
        oldPassword: 'fissyst',
        newPassword: 'fissyChange',
        confirmNewPassword: 'fissyChange'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Incorrect Old Password');
        done();
      });
    });

    it('check that an authenticated user can update his/her profile', (done) => {
      request(app)
      .put(`/users/${user.createdUser.id}`)
      .set('x-access-token', userToken)
      .send({
        username: 'FissyChange',
        oldPassword: 'fissyTest',
        newPassword: 'fissyChange',
        confirmNewPassword: 'fissyChange'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Details Updated Successfully');
        done();
      });
    });
  });

  describe('Delete User:', () => {
    it('checks that only a SuperAdmin/Admin can delete a user', (done) => {
      request(app)
      .delete(`/users/${user.createdUser.id}`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Not authenticated as Super Admin');
        done();
      });
    });

    it('Super Amin can delete a user', (done) => {
      request(app)
      .delete(`/users/${user.createdUser.id}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('User deleted Successfully');
        done();
      });
    });
  });
});
