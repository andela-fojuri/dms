import faker from 'faker';

export default {
  user0: {
    email: faker.internet.email().toLowerCase(),
    password: 'fissyTest',
    password_confirmation: 'fissyTest',
    roleId: 2
  },
  user1: {
    username: 'testUser1',
    email: 'testUser@gmail.com',
    password: 'fissyTest',
    password_confirmation: 'fissyTest',
    roleId: 2
  },
  user2: {
    username: 'testUser2',
    email: faker.internet.email().toLowerCase(),
    password: 'fissyTest2',
    password_confirmation: 'fissyTest2',
    roleId: 3
  },
  user3: {
    username: 'testUser3',
    password: 'fissyTest2',
    email: faker.internet.email().toLowerCase(),
    password_confirmation: 'fissyTest2',
  },
  document1: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
  },
  document2: {
    title: faker.finance.accountName(),
    content: faker.lorem.paragraph(),
    access: 'role'
  },
  document3: {
    title: faker.commerce.department(),
    content: faker.lorem.paragraph()
  },
  role1: {
    category: 'Staff'
  },
  role2: {
    category: 'other'
  }

};


