import faker from 'faker';

import '../../../nightwatch.conf';


module.exports = { // adapted from: https://git.io/vodU
  'Create Role': function (browser) {
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
      .click('.button-collapse')
      .waitForElementPresent('li[id=createRole]', 1000)
      .click('li#createRole')
      .waitForElementVisible('div[id=editRole]')
      .setValue('input[name=category]', faker.name.findName())
      .click('input[type=button]')
      .end();
  }
};
