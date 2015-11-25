var la = require('lazy-ass');
var check = require('check-more-types');

var label = 'js-to-js';
var log = require('debug')(label);
var _ = require('lodash');
var path = require('path');

function fnToJs(options, fn, callback) {
  la(check.fn(fn), 'missing function', fn);
  la(check.fn(callback), 'missing callback', callback);

  var preWrapper = '\n;((';
  var postWrapper = ')(' + JSON.stringify(options) + '));\n';
  var wrapped = preWrapper + fn.toString() + postWrapper;
  log('wrapped function');
  log(wrapped);
  return callback(null, wrapped);
}

function objectToJs(filePath, options, loaded, callback) {
  la(check.fn(callback), 'missing callback', callback);

  // expected loaded to be an object,
  // now merge with given settings
  // only take settings that exist in the original file,
  // do NOT add (leak) any other settings
  var configured = _.pick(options, Object.keys(loaded));
  var src = options.pretty ?
    JSON.stringify(configured, null, 2) : JSON.stringify(configured);

  var baseName = path.basename(filePath, '.js');
  var asName = _.camelCase(baseName);
  log('exporting options under name %s', asName);
  log(configured);

  return callback(null, 'var ' + asName + ' = ' + src + ';\n');
}

function jsToJs(filePath, options, callback) {
  log('need to render js file %s', filePath);
  var loaded = require(filePath);
  log('loaded from %s type', filePath, typeof loaded);

  la(check.object(loaded) || check.fn(loaded),
    'invalid exported type from file', filePath,
    'should be an object or a function');

  if (check.fn(loaded)) {
    return fnToJs(options, loaded, callback);
  }

  return objectToJs(filePath, options, loaded, callback);
}

module.exports = jsToJs;
