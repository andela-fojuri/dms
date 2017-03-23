import faker from 'faker';

export default {
  user1: {
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: 'fissyTest',
    password_confirmation: 'fissyTest',
    roleId: 2
  },
  user2: {
    username: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password: 'fissyTest2',
    password_confirmation: 'fissyTest2',
    roleId: 3
  },
  user3: {
    username: faker.name.findName(),
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
    category: 'Admin'
  },
  role2: {
    category: 'other'
  }

};


