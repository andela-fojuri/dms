import faker from 'faker';

import '../../../nightwatch.conf';


module.exports = { // adapted from: https://git.io/vodU0
  'Document Management System': function (browser) {
    browser
      .url('http://localhost:4000')
      .assert.title('DMS')
      .waitForElementVisible('body', 1000)
      .end();
  },
  'User Login': function (browser) {
    browser
      .url('http://localhost:4000')
      .assert.elementPresent('div')
      .waitForElementVisible('button')
      .click('.btn')
      .assert.urlEquals('http://localhost:4000/login')
      .waitForElementVisible('input[type=text]')
      .setValue('input[type=text]', 'Fisayomi')
      .setValue('input[type=password]', 'fisayomi')
      .click('.btn')
      .pause(1000)
      .assert.urlEquals('http://localhost:4000/dashboard')
      .end();
  },

  'User SignUp': function (browser) {
    browser
      .url('http://localhost:4000')
      .assert.elementPresent('div')
      .waitForElementVisible('button')
      .click('.btn')
      .assert.urlEquals('http://localhost:4000/login')
      .waitForElementVisible('a[name=signupLink]')
      .click('#signupLink')
      .pause(1000)
      .assert.urlEquals('http://localhost:4000/signup')
      .waitForElementVisible('input[type=text]')
      .setValue('input[name=username]', faker.name.findName())
      .setValue('input[name=email]', faker.internet.email().toLowerCase())
      .setValue('input[name=password]', 'myPassword')
      .setValue('input[name=password_confirmation]', 'myPassword')
      .click('#selectInput')
      .click('.opts[value="3"]')
      .click('.btn')
      .pause(5000)
      .assert.urlEquals('http://localhost:4000/dashboard')
      .end();
  }
};
