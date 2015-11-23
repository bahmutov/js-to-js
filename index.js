var log = require('debug')('js-to-js');
var _ = require('lodash');
var path = require('path');

function jsToJs(filePath, options, callback) {
  console.log('need to render js file %s', filePath);
  console.log('with options', options);
  var loaded = require(filePath);

  // expected loaded to be an object,
  // now merge with given settings
  // only take settings that exist in the original file,
  // do NOT add (leak) any other settings
  var configured = _.pick(options, Object.keys(loaded));
  var src = options.pretty ?
    JSON.stringify(configured, null, 2) : JSON.stringify(configured);

  var baseName = path.basename(filePath, '.js');
  var asName = _.camelCase(baseName);
  console.log('configured options under name %s', asName);
  console.log(configured);
  return callback(null, 'var ' + asName + ' = ' + src + ';\n');
}

module.exports = jsToJs;
