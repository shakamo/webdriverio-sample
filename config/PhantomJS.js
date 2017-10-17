'use strict'
exports.config = {
  desiredCapabilities: {
        "browserName": "phantomJS",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "phantomjs.page.settings.userAgent": "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393",
        "phantomjs.cli.args" : []
  },
  services: ['phantomjs']
};
