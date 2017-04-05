import faker from 'faker';

import '../../../nightwatch.conf';


module.exports = { // adapted from: https://git.io/vodU
  'Admin Login': function (browser) {
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
      .assert.containsText('.docLabel', 'Accessible Documents')
      .pause(1000)
      .click('.button-collapse')
      .waitForElementPresent('a[id=createDoc]', 1000)
      .click('#createDoc')
      .waitForElementVisible('div[class=modal-content]')
      .setValue('input[name=title]', faker.name.findName())
      .setValue('div.fr-element', faker.lorem.paragraph())
      .click('#selectInput')
      .click('.opts[value=Role]')
      .click('input[type=button]')
      .click('input[type=button]')
      .waitForElementVisible('.button-collapse')
      .click('.button-collapse')
      .click('.button-collapse')
      .click('li#allDocs')
      .click('li#allDocs')
      .pause(1000)
      .assert.containsText('.docLabel', 'All Documents')
      .pause(1000)
      .click('.button-collapse')
      .waitForElementPresent('a[class=button-collapse]', 1000)
      .waitForElementVisible('a[class=button-collapse]')
      .pause(1000)
      .click('.button-collapse')
      .click('.button-collapse')
      .waitForElementPresent('a[id=allUsers]', 1000)
      .click('#allUsers')
      .click('#allUsers')
      .pause(1000)
      .waitForElementVisible('h4[class=userLabel]')
      .assert.containsText('h4[class=userLabel]', 'All Users')
      .click('.button-collapse')
      .click('.button-collapse')
      .waitForElementPresent('a[id=allRoles]', 1000)
      .click('#allRoles')
      .pause(1000)
      .waitForElementVisible('h4[class=roleLabel]')
      .assert.containsText('h4[class=roleLabel]', 'All Roles')
      .end();
  }
};

