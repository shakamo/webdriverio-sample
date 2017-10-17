'use strict'
require('date-utils');
var fs = require('fs-extra');
var jsonfile = require('jsonfile')
var defaultFilePath = process.cwd() + '/config/default.json';

var data = jsonfile.readFileSync(defaultFilePath);

++data.build;

let dt = new Date();
data.executedAt = String(dt.toFormat("YYYYMMDDHH24MISS"));
jsonfile.writeFile(defaultFilePath, data, {spaces: 2}, function(err) {});

var outputPath = process.cwd() + '/output/' + data.executedAt + '_' + data.build + '/';
fs.mkdirsSync(outputPath);

var outputTempPath = process.cwd() + '/output/' + data.executedAt + '_' + data.build + '/temp/';
fs.mkdirsSync(outputTempPath);
