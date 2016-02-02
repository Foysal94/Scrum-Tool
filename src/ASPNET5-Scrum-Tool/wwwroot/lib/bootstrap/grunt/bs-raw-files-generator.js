/*!
 * Bootstrap Grunt task for generating raw-files.min.js for the Customizer
 * http://getbootstrap.com
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

'use strict';

var fs = require('fs');
var btoa = require('btoa');
var glob = require('glob');

function getFiles(type) ***REMOVED***
  var files = ***REMOVED******REMOVED***;
  var recursive = type === 'less';
  var globExpr = recursive ? '/**/*' : '/*';
  glob.sync(type + globExpr)
    .filter(function (path) ***REMOVED***
      return type === 'fonts' ? true : new RegExp('\\.' + type + '$').test(path);
***REMOVED***)
    .forEach(function (fullPath) ***REMOVED***
      var relativePath = fullPath.replace(/^[^/]+\//, '');
      files[relativePath] = type === 'fonts' ? btoa(fs.readFileSync(fullPath)) : fs.readFileSync(fullPath, 'utf8');
***REMOVED***);
  return 'var __' + type + ' = ' + JSON.stringify(files) + '\n';
***REMOVED***

module.exports = function generateRawFilesJs(grunt, banner) ***REMOVED***
  if (!banner) ***REMOVED***
    banner = '';
  ***REMOVED***
  var dirs = ['js', 'less', 'fonts'];
  var files = banner + dirs.map(getFiles).reduce(function (combined, file) ***REMOVED***
    return combined + file;
  ***REMOVED***, '');
  var rawFilesJs = 'docs/assets/js/raw-files.min.js';
  try ***REMOVED***
    fs.writeFileSync(rawFilesJs, files);
  ***REMOVED*** catch (err) ***REMOVED***
    grunt.fail.warn(err);
  ***REMOVED***
  grunt.log.writeln('File ' + rawFilesJs.cyan + ' created.');
***REMOVED***;
