'use strict'
jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
require('date-utils');
var fs = require('fs-extra');
var jsonfile = require('jsonfile')
var jimp = require("jimp");
var PNG = require('pngjs2').PNG;

var defaultFile = jsonfile.readFileSync(process.cwd() + '/config/default.json');
var outputPath = process.cwd() + '/output/' + defaultFile.executedAt + '_' + defaultFile.build + '/';
var outputTempPath = process.cwd() + '/output/' + defaultFile.executedAt + '_' + defaultFile.build + '/temp/';

var browser;

// 引数からテスト方法を分岐させる。
var base;
var args = JSON.parse(process.env.npm_config_argv).original[1];
if(args.match(/test-integration/)){
  base = require(process.cwd() + '/config/PhantomJS.js');
}
if(args.match(/test-design/)){
  base = require(process.cwd() + '/config/Browserstack.js');
  base.config.desiredCapabilities.build =  defaultFile.build + ' ';
}
if(args.match(/test-db/)){
  base = require(process.cwd() + '/config/PhantomJS.js');
}

var initBrowser = function(){
  switch(global.browser){
  	case 'Chrome':
  	case 'Safari':
  	case 'PhantomJS':
  	case 'IE':
  	case 'Edge':
      return this.setViewportSize(global.size, true);
  	case 'Firefox':
  	  // スクロールバー分を予め足しておく。
  	  global.size.width += 17;
      return this.setViewportSize(global.size, true);
  	case 'iPhone':
  	case 'Android':
  }
  return;
}

var headerSize = 0;
var footerSize = 0;
var setExcludeSize = function(h, f){
	headerSize = h;
	footerSize = f;
}

var resetCookie = function(){
  switch(global.browser){
    case 'Edge':
      return this;
    case 'Firefox':
    case 'IE':
  	case 'Chrome':
  	case 'Safari':
  	case 'PhantomJS':
  	case 'iPhone':
  	case 'Android':
  	  break;
  }
  var cookie;
  return this
    .getCookie().then(function(allCookies){
      cookie = allCookies;
    })
    .deleteCookie(cookie);
};
 
var createYayoiId = function()
{
  var data = jsonfile.readFileSync(defaultFilePath);
  var count = data.password.replace(/\d{4}/, function(n){return (++n);});
  data.yayoiId = data.yayoiId.replace(/^.+\d{4}/, count);
  data.password = count;
  jsonfile.writeFile(defaultFilePath, data, {spaces: 2}, function(err) {});
  return data;
};

var screenHeight = 0;
var saveScreen = function(test,sub){
  var browser;
  switch(global.browser){
    case 'Edge':
    case 'IE':
      browser = this.execute('document.styleSheets[0].insertRule("html {-ms-overflow-style: none;}", 0);');
      break;
  	case 'Chrome':
  	case 'Safari':
      browser = this.execute('document.styleSheets[0].addRule("body", "overflow-y: hidden;");');
      break;
    case 'iPhone':
      browser = this.pause(4500);
      break;
  	case 'PhantomJS':
  	case 'Android':
    case 'Firefox':
      browser = this;
      break;
  }

  screenHeight = 0;
  browser.getElementSize('body').then(function (size){screenHeight = size.height;console.log(size);});

  return browser.screen(test, sub);
}

var count = 1;
var screen = function(test,sub){
  var description = test.description ? test.description : test;
  var description = sub ? description + sub : description;
  return this
    .pause(500)
    .saveScreenshot(outputTempPath + global.browser + '-' + description + '-' + count++ + '.png')
    .nextscreen(test, sub);
}

var scrollHeight = 0;
var nextscreen = function(test, sub){
  var description = test.description ? test.description : test;
  var description = sub ? description + sub : description;
  switch(global.browser){
    case 'IE':
    case 'PhantomJS':
      fs.copy(outputTempPath + global.browser + '-' + description + '-1.png', outputPath + global.browser + '-' + description + '.png');
      return;
    case 'Edge':
    case 'Firefox':
    case 'Chrome':
    case 'Safari':
    case 'iPhone':
    case 'Android':
      break;
  }

  var contentHeight = global.size.height - headerSize - footerSize;
  screenHeight = screenHeight - contentHeight;
  if(0 < screenHeight){
  	if(screenHeight < contentHeight){
  		scrollHeight += screenHeight;
  	}else{
      scrollHeight += contentHeight;
  	}

    var c = count - 1;
    if(c == 1){
      //　footer を消す
      switch(global.browser){
        case 'IE':
        case 'PhantomJS':
        case 'Edge':
        case 'Firefox':
        case 'Chrome':
        case 'Safari':
        case 'Android':
          jimp.read(outputTempPath + global.browser + '-' + description + '-' + c + '.png', function(err, image){
            image
              .crop(0, 0, image.bitmap.width, image.bitmap.height - footerSize)
              .write(outputTempPath + global.browser + '-' + description + '-' + c + '.png');
          });
          break;
        case 'iPhone':
          jimp.read(outputTempPath + global.browser + '-' + description + '-' + c + '.png', function(err, image){
            image
              .crop(0, 0, image.bitmap.width, image.bitmap.height - footerSize -44)
              .write(outputTempPath + global.browser + '-' + description + '-' + c + '.png');
          });
          break;
      }
    }else{
      //　header/footer を消す
      switch(global.browser){
        case 'IE':
        case 'PhantomJS':
        case 'Edge':
        case 'Firefox':
        case 'Chrome':
        case 'Safari':
        case 'Android':
          jimp.read(outputTempPath + global.browser + '-' + description + '-' + c + '.png', function(err, image){
            image
              .crop(0, headerSize, image.bitmap.width, image.bitmap.height - headerSize - footerSize)
              .write(outputTempPath + global.browser + '-' + description + '-' + c + '.png');
            imageCombiner(outputTempPath + global.browser + '-' + description + '-1' + '.png', outputTempPath + global.browser + '-' + description + '-' + (count - 1) + '.png', outputPath + global.browser + '-' + description + '.png');
          });
          break;
        case 'iPhone':
          jimp.read(outputTempPath + global.browser + '-' + description + '-' + c + '.png', function(err, image){
            image
              .crop(0, headerSize, image.bitmap.width, image.bitmap.height - headerSize - footerSize -64 -44)
              .write(outputTempPath + global.browser + '-' + description + '-' + c + '.png');
            imageCombiner(outputTempPath + global.browser + '-' + description + '-1' + '.png', outputTempPath + global.browser + '-' + description + '-' + (count - 1) + '.png', outputPath + global.browser + '-' + description + '.png');
          });
          break;
      }
    }

    switch(global.browser){
      case 'IE':
      case 'Edge':
      case 'Firefox':
  	  case 'Chrome':
      case 'Safari':
      case 'PhantomJS':
        return this
          .scroll(0, scrollHeight)
          .screen(test, sub);
        break;
  	  case 'iPhone':
      case 'Android':
        return this
          .touchPerform([
            {
              action: 'press',
              options: {
                x: 150,
                y: contentHeight - 100
              }
            },
            {
              action: 'wait', options: {ms: 200}
            }
            ,{
              action: 'moveTo',
              options: {
                x: 0,
                y: -contentHeight/2
              }
            },
            {
              action: 'release'
            }
          ])
          .pause(200)
          .touchPerform([
            {
              action: 'press',
              options: {
                x: 150,
                y: contentHeight - 100
              }
            },
            {
              action: 'wait', options: {ms: 200}
            }
            ,{
              action: 'moveTo',
              options: {
                x: 0,
                y: -contentHeight/2
              }
            },
            {
              action: 'release'
            }
          ])
          .screen(test, sub);
  	    break;
    }
  }else{
    //　header/重複分 を消す
    jimp.read(outputTempPath + global.browser + '-' + description + '-' + (count - 1) + '.png', function(err, image){
      image
        .crop(0, headerSize + footerSize - screenHeight, image.bitmap.width, image.bitmap.height - headerSize + screenHeight - footerSize)
        .write(outputTempPath + global.browser + '-' + description + '-' + (count - 1) + '.png');
      if(2 < count){
        imageCombiner(outputTempPath + global.browser + '-' + description + '-1' + '.png', outputTempPath + global.browser + '-' + description + '-' + (count - 1) + '.png', outputPath + global.browser + '-' + description + '.png');
      }
    });
  }
  return;
}

var tabs;
var nextTab = function(t){
  tabs = t;
  return this.switchTab(tabs[1]).initBrowser();
};

var prevTab = function(){
  return this.switchTab(tabs[0]);
};

var saveScreenOfNextTab = function async (test){
  return Promise.all([
    this.getTabIds().then(function(tabs){
      return browser.nextTab(tabs).saveScreen(test, 'sub');
    })
    .prevTab()
  ]);
}

var imageCombiner = function (image1FileName, image2FileName, output) {
  return fs.createReadStream(image1FileName)
    .pipe(new PNG())
    .on('parsed', function() {
      var image1 = this;
      return fs.createReadStream(image2FileName)
        .pipe(new PNG())
        .on('parsed', function() {
          var image2 = this;

          var dst = new PNG({width: image1.width, height: image1.height + image2.height});
          image1.bitblt(dst, 0, 0, image1.width, image1.height, 0, 0);
          image2.bitblt(dst, 0, 0, image2.width, image2.height, 0, image1.height);
          dst.pack().pipe(fs.createWriteStream(output));
      });
    });
};

var modules = {};
modules.createBrowser = function(){
  browser = require('webdriverio').remote(base.config);
  browser.addCommand('initBrowser', initBrowser);
  browser.addCommand('saveScreen', saveScreen);
  browser.addCommand('resetCookie', resetCookie);
  browser.addCommand('nextTab', nextTab);
  browser.addCommand('prevTab', prevTab);
  browser.addCommand('saveScreenOfNextTab', saveScreenOfNextTab);
  browser.addCommand('createYayoiId', createYayoiId);
  browser.addCommand('screen', screen);
  browser.addCommand('nextscreen', nextscreen);
  browser.addCommand('setExcludeSize', setExcludeSize);
  return browser;
}
module.exports = modules;

console.log(global.browser);
console.log(global.size);
console.log(process.cwd());
