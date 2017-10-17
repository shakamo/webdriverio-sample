'use strict'
exports.config = {
  desiredCapabilities: {
    browserName: 'phantomjs',
    'phantomjs.page.settings.userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9'
  },
  services: ['phantomjs']
};
