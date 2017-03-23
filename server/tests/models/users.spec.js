import chai from 'chai';
import details from '../helper/user';
import db from '../../app/models';

const expect = chai.expect;
const userParams = details.user3;

const requiredFields = ['username', 'email', 'password', 'password_confirmation'];
const uniqueFields = ['username', 'email'];

describe('User Model: ', () => {
  describe('How User Model works: ', () => {
    let user;
    before((done) => {
      db.Role.create(details.role1).then((createdRole) => {
        userParams.roleId = createdRole.id;
        db.User.create(userParams).then((createdUser) => {
          user = createdUser;
          done();
        });
      });
    });

    after(() => db.sequelize.sync({ force: true }));

    it('should be able to create a user', (done) => {
      expect(user).to.exist;
      expect(typeof user).to.equal('object');
      done();
    });

    it('should create a user with username and email', (done) => {
      expect(user.email).to.equal(userParams.email);
      expect(user.username).to.equal(userParams.username);
      done();
    });

    it('should create a user with hashed password', (done) => {
      expect(user.password_digest).to.not.equal(userParams.password);
      done();
    });

    it('should be able to update a user', (done) => {
      db.User.findById(user.id).then((foundUser) => {
        foundUser.update({ username: 'updateName' }).then((updatedUser) => {
          expect(updatedUser.username).to.equal('updateName');
          done();
        });
      });
    });
  });

  describe('How User Validation works: ', () => {
    let user;
    beforeEach((done) => {
      db.Role.create(details.role1).then((createdRole) => {
        userParams.roleId = createdRole.id;
        user = db.User.build(userParams);
        done();
      });
    });

    afterEach(() => db.sequelize.sync({ force: true }));

    describe('Required Fields validation', () => {
      requiredFields.forEach((field) => {
        it(`checks that ${field} cannot be null`, (done) => {
          user[field] = null;
          user.save().catch((error) => {
            expect(/SequelizeValidationError/.test(error.name)).to.be.true;
            done();
          });
        });
      });
    });

      describe('Unique Fields validation', () => {
        uniqueFields.forEach((field) => {
          it(`checks that ${field} must be unique`, (done) => {
            user.save().then((createdUser) => {
              userParams.roleId = createdUser.roleId;
              return db.User.build(userParams).save();
            }).catch((error) => {
              expect(/SequelizeUniqueConstraintError/.test(error.name)).to.be.true;
              done();
            });
          });
        });
      });

      describe('Mail Validation', () => {
        it('requires user mail to be an email', (done) => {
          user.email = 'fisayo email';
          user.save()
          .catch((error) => {
            expect(/Validation isEmail failed/.test(error.message)).to.be.true;
            done();
          });
        });
      });
  });
});
