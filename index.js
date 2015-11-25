var la = require('lazy-ass');
var check = require('check-more-types');

var label = 'js-to-js';
var log = require('debug')(label);
var _ = require('lodash');
var path = require('path');
var plainJson = JSON.stringify;
var prettyJson = _.partialRight(JSON.stringify, null, 2);

var wrapTemplate = 'var <%= name %> = <%= value %>;\n';
var compiledWrapTemplate = _.template(wrapTemplate);

function fnToJs(options, fn, callback) {
  la(check.fn(fn), 'missing function', fn);
  la(check.fn(callback), 'missing callback', callback);

  var preWrapper = '\n;((';
  var postWrapper = ')(' + plainJson(options) + '));\n';
  var wrapped = preWrapper + fn.toString() + postWrapper;
  log('wrapped function');
  log(wrapped);
  return callback(null, wrapped);
}

function wrapVariable(name, object, pretty) {
  var printer = pretty ? prettyJson : plainJson;
  var printed = printer(object);
  return compiledWrapTemplate({
    name: name,
    value: printed
  });
}

function objectToJs(filePath, options, loaded, callback) {
  la(check.fn(callback), 'missing callback', callback);

  // expected loaded to be an object,
  // now merge with given settings
  // only take settings that exist in the original file,
  // do NOT add (leak) any other settings
  var configured = _.pick(options, Object.keys(loaded));


  var baseName = path.basename(filePath, '.js');
  var asName = _.camelCase(baseName);
  log('exporting options under name %s', asName);
  log(configured);

  var wrapped = wrapVariable(asName, configured, options.pretty);
  return callback(null, wrapped);
}

function templateRender(filePath, options, callback) {
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

function middlewareSetup(varName, config) {
  var pretty = true;
  return function jsToJsMiddleware(req, res) {
    res.setHeader('content-type', 'application/javascript');
    var wrapped = wrapVariable(varName, config, pretty);
    res.send(wrapped);
  };
}

function jsToJs() {
  var isCalledToRenderTemplate = arguments.length === 3;
  if (isCalledToRenderTemplate) {
    return templateRender.apply(null, arguments);
  }
  var isMiddlewareSetup = arguments.length === 2;
  if (isMiddlewareSetup) {
    return middlewareSetup.apply(null, arguments);
  }
  la(false, 'Unexpected arguments to', label, arguments);
}

module.exports = jsToJs;
