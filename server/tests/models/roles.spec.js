import chai from 'chai';
import details from '../helper/user';
import db from '../../app/models';

const expect = chai.expect;
const roleParams = details.role2;

describe('Role Model: ', () => {
  describe('How Role Model Works: ', () => {
    let role;
    before((done) => {
      db.Role.create(roleParams).then((createdRole) => {
        role = createdRole;
        done();
      });
    });

    after(() => db.Role.sequelize.sync({ force: true }));

    it('should be able to create a role ', () => {
      expect(role).to.exist;
      expect(typeof role).to.equal('object');
    });

    it('should be able to create a role with category', () => {
      expect(role.category).to.equal(roleParams.category);
    });

    describe('Role model validation', () => {
      after(() => db.Role.sequelize.sync({ force: true }));
      describe('Category field validation', () => {
        it('assert that Category field is required to create a role', (done) => {
          db.Role.create()
          .catch((error) => {
            expect(/notNull Violation/.test(error.message)).to.be.true;
            done();
          });
        });

        it('assert that Category field must me unique', (done) => {
          db.Role.create(roleParams).then(() => {
            db.Role.create(roleParams);
          }).catch((error) => {
            expect(/UniqueConstraintError/.test(error.name)).to.be.true;
            done();
          });
        });
      });
    });
  });
});

