'use strict'
var utils = require(process.cwd() + '/common/utils.js');

const browserstack = require('browserstack-local');
var browser = utils.createBrowser();


describe('業務シナリオテスト', function() {

  beforeAll(function() {
    return browser.init().initBrowser().setExcludeSize(59, 71);
  });

  beforeEach(function() {
    return ;
  });

  var test = it('gets the title of MDN toppage', () => {
    return browser
      .url('https://myportal.yayoi-kk.co.jp/')
      .saveScreen(test);
  });

  afterAll(function() {
    return browser.end();
  });
});
