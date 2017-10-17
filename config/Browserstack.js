'use strict'
exports.config = {
  user: 'yamada25',
  key: 'jTsxzY8FS2y4y65iYG5m',
  services: ['browserstack'],
  browserstackLocal: true,
  desiredCapabilities: {
  },
  onPrepare: onPrepareFunc,
  onComplete: onCompleteFunc
}

if('iPhone' === global.browser){
  exports.config.desiredCapabilities = {
    'browserstack.local': true,
    'browserstack.debug': true,
    'browserstack.selenium_version': '3.4.0',
    'browserstack.appium_version': '1.6.3',
    realMobile: true,
    browser: 'iPhone',
    platform: 'MAC',
    device: 'iPhone 7',
    build: '',
    project: 'Design Test',
    os: 'ios'
  }
}
if('iPhone_not_real' === global.browser){
  exports.config.desiredCapabilities = {
    'browserstack.local': true,
    'browserstack.debug': true,
    'browserstack.selenium_version': '3.4.0',
    'browserstack.appium_version': '1.6.3',
    realMobile: true,
    browserName: 'iPhone',
    platform: 'MAC',
    device: 'iPhone 7',
    build: '',
    project: 'Design Test'
  }
}
if('Android' === global.browser){
  exports.config.desiredCapabilities = {
    'browserstack.local': true,
    'browserstack.debug': true,
    'browserstack.selenium_version': '3.4.0',
    'browserName': 'android',
    'platform': 'ANDROID',
    'device': 'Samsung Galaxy S5',
    build: '',
    project: 'Design Test'
  }
}
if('Chrome' === global.browser){
  exports.config.desiredCapabilities = {
    'browserstack.local': true,
    'browserstack.debug': true,
    'browserstack.selenium_version': '3.4.0',
    browserName: 'Chrome',
    'browser_version': '58.0',
    os: 'Windows',
    os_version: '10',
    resolution: '1280x800',
    build: '',
    project: 'Design Test'
  }
}
if('Safari' === global.browser){
  exports.config.desiredCapabilities = {
    'browserstack.local': true,
    'browserstack.debug': true,
    'browserstack.selenium_version': '3.4.0',
    os_version: 'El Capitan',
    browser: 'Safari',
    browser_version: '9.1',
    'browserstack.safari.driver': '2.48',
    os: 'OS X',
    resolution: '1280x960',
    build: '',
    project: 'Design Test'
  }
}
if('Firefox' === global.browser){
  exports.config.desiredCapabilities = {
    'browserstack.local': true,
    'browserstack.debug': true,
    'browserstack.selenium_version': '3.4.0',
    'browserstack.geckodriver': '0.16.0',
    'browserName': 'firefox',
    'version': '53.0',
    'os': 'Windows',
    'os_version': '10',
    resolution: '1280x800',
    build: '',
    project: 'Design Test'
  }
}
if('IE' === global.browser){
  exports.config.desiredCapabilities = {
    'browserstack.local': true,
    'browserstack.debug': true,
    'browserstack.selenium_version': '3.4.0',
    'browserName': 'IE',
    'version': '11.0',
    'os': 'Windows',
    'os_version': '10',
    resolution: '1280x800',
    build: '',
    project: 'Design Test'
  }
}
if('Edge' === global.browser){
  exports.config.desiredCapabilities = {
    'browserstack.local': true,
    'browserstack.debug': true,
    'browserstack.selenium_version': '3.4.0',
    'browserName': 'Edge',
    'browser_version': '15.0',
    'os': 'Windows',
    'os_version': '10',
    resolution: '1280x800',
    build: '',
    project: 'Design Test'
  }
}

var onPrepareFunc = function(config, capabilities) {
  console.log("Connecting local");
  return new Promise(function(resolve, reject) {
    exports.bs_local = new browserstack.Local();
    exports.bs_local.start({
      'key': exports.config.key
    },
    function(error) {
      if (error) return reject(error);
      console.log('Connected. Now testing...');

      resolve();
    });
  });
}

// Code to stop browserstack local after end of test
var onCompleteFunc = function(capabilties, specs) {
  exports.bs_local.stop(function() {});
}


/*
  iPhone: {
    user: 'poryooo2',
    key: 'BKUpVBHpUyCRiRq3s4vs',

    services: ['browserstack'],
    browserstackLocal: true,

    desiredCapabilities: {
      'browserstack.local': true,
      'browserstack.debug': true,
      'browserName': 'iPhone',
      'platform': 'MAC',
      'device': 'iPhone 6'
    },
    onPrepare: onPrepareFunc,
    onComplete: onCompleteFunc
  },
  Android: {
    user: 'poryooo2',
    key: 'BKUpVBHpUyCRiRq3s4vs',

    services: ['browserstack'],
    browserstackLocal: true,

    desiredCapabilities: {
      'browserstack.local': true,
      'browserstack.debug': true,
      'browserName': 'android',
      'platform': 'ANDROID',
      'device': 'Samsung Galaxy S5'
    },
    onPrepare: onPrepareFunc,
    onComplete: onCompleteFunc
  }


  IE: {
    user: 'ahoooo1',
    key: 'hPz8JGPtW1h8jLybyY76',

    services: ['browserstack'],
    browserstackLocal: true,

    desiredCapabilities: {
      'browserstack.local': true,
      'browserstack.debug': true,
      'browserName': 'IE',
      'version': '11.0',
      'os': 'Windows',
      'os_version': '10',
      'resolution': '1600x1200'
    },
    onPrepare: onPrepareFunc,
    onComplete: onCompleteFunc
  }

  Edge: {
    user: 'ahoooo1',
    key: 'hPz8JGPtW1h8jLybyY76',

    services: ['browserstack'],
    browserstackLocal: true,

    desiredCapabilities: {
      'browserstack.local': true,
      'browserstack.debug': true,
      'browserName': 'Edge',
      'version': '15.0',
      'os': 'Windows',
      'os_version': '10',
      'resolution': '1600x1200'
    },
    onPrepare: onPrepareFunc,
    onComplete: onCompleteFunc
  }

  Firefox: {
    user: 'ahoooo1',
    key: 'hPz8JGPtW1h8jLybyY76',

    services: ['browserstack'],
    browserstackLocal: true,

    desiredCapabilities: {
      'browserstack.local': true,
      'browserstack.debug': true,
      'browserName': 'firefox',
      'version': '53.0',
      'os': 'Windows',
      'os_version': '10',
      'resolution': '1600x1200'
    },
    onPrepare: onPrepareFunc,
    onComplete: onCompleteFunc
  }

  Chrome: {
    user: 'ahoooo1',
    key: 'hPz8JGPtW1h8jLybyY76',

    services: ['browserstack'],
    browserstackLocal: true,

    desiredCapabilities: {
      'browserstack.local': true,
      'browserstack.debug': true,
      'browserName': 'Chrome',
      'version': '58.0',
      'os': 'Windows',
      'os_version': '10',
      'resolution': '1600x1200'
    },
    onPrepare: onPrepareFunc,
    onComplete: onCompleteFunc
  }

  OSX: {
    user: 'ahoooo1',
    key: 'hPz8JGPtW1h8jLybyY76',

    services: ['browserstack'],
    browserstackLocal: true,

    desiredCapabilities: {
      'browserstack.local': true,
      'browserstack.debug': true,
      'browserName': 'Safari',
      'version': '10.1',
      'os': 'OS X',
      'os_version': 'Sierra',
      'resolution': '1600x1200'

    },
    onPrepare: onPrepareFunc,
    onComplete: onCompleteFunc
  }
*/