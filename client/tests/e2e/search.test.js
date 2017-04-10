
import '../../../nightwatch.conf';

module.exports = { // adapted from: https://git.io/vodU
  'Login to Search': function (browser) {
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
      .waitForElementVisible('input[type=search]')
      .setValue('input[type=text]', 'Granville Koch III')
      .pause(4000)
      .end();
  }
};
