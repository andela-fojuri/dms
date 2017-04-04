import faker from 'faker';
import bcrypt from 'bcryptjs';
import db from '../../app/models';


export const
  roles = [
    { category: 'SuperAdmin' },
    { category: 'Regular' },
    { category: 'Staff' }
  ],
  users = [{
    username: 'Fissy',
    email: 'fissy@yahoo.com',
    password: 'fissyAdmin',
    password_confirmation: 'fissyAdmin',
    password_digest: bcrypt.hashSync('fissyAdmin', 10),
    roleId: 1
  }, {
    username: 'FissyFirst',
    email: 'fissyfirst@yahoo.com',
    password: 'fissyfirst',
    password_confirmation: 'fissyfirst',
    password_digest: bcrypt.hashSync('fissyfirst', 10),
    roleId: 3
  }, {
    username: 'FissySecond',
    email: 'fissysecond@yahoo.com',
    password: 'fissysecond',
    password_confirmation: 'fissysecond',
    password_digest: bcrypt.hashSync('fissysecond', 10),
    roleId: 3
  }],
  documents = [{
    title: 'sample1',
    content: 'this is a sample1',
    access: 'Role',
    userId: 2
  }, {
    title: 'sample2',
    content: 'this is a sample2',
    access: 'Role',
    userId: 2
  }];


const seeds = () => {
  db.sequelize.sync({ force: true }).then(() => {
    // Table created
    db.Role.bulkCreate(roles);
    db.User.bulkCreate(users).then(() => {
      db.Document.bulkCreate(documents);
    });
  });
};

export default seeds();
