/* global describe, it */
var la = require('lazy-ass');
var check = require('check-more-types');
var join = require('path').join;

describe('js-to-js exported object handling', function () {
  var jsToJs = require('..');

  it('exports object', function (done) {
    var testObjectFilename = join(__dirname, 'test-object-template.js');
    jsToJs(testObjectFilename, { foo: 42 }, function (ignored, source) {
      la(check.unemptyString(source), 'has transformed source', source);
      la(source.indexOf('var') !== -1, 'has var declaration', source);
      la(source.indexOf('foo') !== -1, 'has foo', source);
      la(source.indexOf('42') !== -1, 'has value 42', source);
      done();
    });
  });
});
