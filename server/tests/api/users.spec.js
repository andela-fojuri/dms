import request from 'supertest';
import chai from 'chai';
import app from '../../../serverTools/server';
import userDetails from '../helper/user';

const expect = chai.expect;

describe('User Test Suite: ', () => {
  let userToken, userToken2, adminToken;
  describe('Create User:', () => {
    it('creates a new user', (done) => {
      request(app)
        .post('/users')
        .send(userDetails.user1)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('User Created Successfully');
          done();
        });
    });


    it('checks if created user is unique', (done) => {
      request(app)
        .post('/users')
        .send({
          username: userDetails.user1.username,
          email: userDetails.user1.email,
          password: 'fissyTest2',
          password_confirmation: 'fissyTest2',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal(`User with ${userDetails.user1.username}exits`);
          done();
        });
    });

    it('asserts that a  user cannot log in with wrong username/password', (done) => {
      request(app)
        .post('/users/login')
        .send({
          username: userDetails.user1.username,
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
          username: userDetails.user1.username,
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
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('User Created Successfully');
          done();
        });
    });

    it('checks that second user also gets a token', (done) => {
      request(app)
        .post('/users/login')
        .send({
          username: userDetails.user2.username,
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
          username: 'fissyAdmin',
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
    it('asserts that SuperAdmin/Admin can see list of all users', (done) => {
      request(app)
        .get('/users')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.body.users).to.be.instanceof(Array);
          done();
        });
    });

    it('asserts that SuperAdmin/Admin can search for a user', (done) => {
      request(app)
        .get(`/search/users?username=${2}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.body.users).to.be.instanceof(Array);
          res.body.users.forEach((searchedUser) => {
            expect(searchedUser.username).to.be.a('string');
            expect(searchedUser.id).to.be.a('number');
          });
          done();
        });
    });

    it('asserts that authenticated user can see profile of a selected user', (done) => {
      request(app)
        .get(`/users/${2}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.body).to.be.instanceof(Object);
          expect(res.body.id).to.be.a('number');
          expect(res.body.username).to.be.a('string');
          done();
        });
    });
  });
  describe('Update User:', () => {
    it('check that an authenticated user can update his/her profile with right details', (done) => {
      request(app)
        .put(`/users/${4}`)
        .set('x-access-token', userToken)
        .send({
          oldPassword: 'fissyst',
          newPassword: 'fissyChange',
          confirmNewPassword: 'fissyChange'
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Incorrect Old Password');
          done();
        });
    });

    it('check that an authenticated user can update his/her password', (done) => {
      request(app)
        .put(`/users/${4}`)
        .set('x-access-token', userToken)
        .send({
          oldPassword: 'fissyTest',
          newPassword: 'fissyChange',
          confirmNewPassword: 'fissyChange'
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Password Successfully');
          done();
        });
    });

    it('check that an authenticated user can update his/her username', (done) => {
      request(app)
        .put(`/users/${4}`)
        .set('x-access-token', userToken)
        .send({
          username: 'FissyChange'
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Username Updated Successfully');
          done();
        });
    });

    it('check that an Admin/Super Admin can upgrade a users role', (done) => {
      request(app)
        .put(`/users/${4}`)
        .set('x-access-token', adminToken)
        .send({
          roleId: 3
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Role Updated Successfully');
          done();
        });
    });
  });

  describe('Delete User:', () => {
    it('Super Admin can delete a user', (done) => {
      request(app)
        .delete(`/users/${4}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.body.message).to.equal('User deleted Successfully');
          done();
        });
    });
  });
});
