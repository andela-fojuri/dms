import chai from 'chai';
import details from '../helper/user';
import db from '../../app/models';

const expect = chai.expect;
const documentParams = details.document1;
const userParams = details.user3;

const requiredFields = ['title', 'content', 'userId', 'access'];

describe('Document Model: ', () => {
  describe('How Document Model Works: ', () => {
    let user, document;
    before((done) => {
      db.Role.create(details.role1).then((createdRole) => {
        userParams.roleId = createdRole.id;
        db.User.create(userParams).then((createdUser) => {
          user = createdUser;
          documentParams.userId = createdUser.id;
          done();
        });
      });
    });

    beforeEach(() => {
      document = db.Document.build(documentParams);
    });

    afterEach(() => db.Document.destroy({ where: {} }));

    after(() => db.sequelize.sync({ force: true }));

    it('should be able to create a document', (done) => {
      document.save()
        .then((createdDocument) => {
          expect(createdDocument).to.exist;
          expect(typeof createdDocument).to.equal('object');
          done();
        });
    });

    it('should create a document with correct userId', (done) => {
      document.save()
        .then((createdDocument) => {
          expect(createdDocument.userId).to.equal(user.id);
          done();
        });
    });

    it('should create a document with published date', (done) => {
      document.save()
      .then((createdDocument) => {
        expect(createdDocument.createdAt).to.exist;
        done();
      });
    });

    it('should create a document with default access set to Public', (done) => {
      document.save()
        .then((createdDocument) => {
          expect(createdDocument.access).to.equal('Public');
          done();
        });
    });

    describe('Required Fields validation', () => {
      requiredFields.forEach((field) => {
        it(`checks that ${field} cannot be null`, () => {
          document.field = null;
          return document.save().catch((error) => {
            expect(/notNull Violation/.test(error.message)).to.be.true;
          });
        });
      });
    });
  });
});
