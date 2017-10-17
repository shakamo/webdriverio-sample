'use strict'
exports.config = {
  sync: false,
  iPhone: {
    user: 'atvgm1',
    key: 'dd5HyzzsVqGTmnRiHsUE',
  sync: false,

    services: ['browserstack'],
    browserstackLocal: true,

    desiredCapabilities: {
      'browserstack.local': true,
      'browserstack.debug': true,
      'browserName': 'iPhone',
      'platform': 'MAC',
      'device': 'iPhone 6',
  build: 'version1',
  project: 'newintropage'
    },
    onPrepare: onPrepareFunc,
    onComplete: onCompleteFunc
  },
  Firefox: {
    user: 'atvgm1',
    key: 'dd5HyzzsVqGTmnRiHsUE',
  build: 'version1',
  project: 'newintropage',
  sync: false,

    services: ['browserstack'],
    browserstackLocal: true,

    desiredCapabilities: {
      'browserstack.local': true,
      'browserstack.debug': true,
      'browserName': 'firefox',
      'version': '53.0',
      'os': 'Windows',
      'os_version': '10',
      'resolution': '1600x1200',
  build: 'version1',
  project: 'newintropage'
    },
    onPrepare: onPrepareFunc,
    onComplete: onCompleteFunc
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