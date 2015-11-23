/* global describe, it */
var la = require('lazy-ass');
var check = require('check-more-types');
var join = require('path').join;

describe('js-to-js exported config function handling', function () {
  var jsToJs = require('..');

  it('is a function', function () {
    la(check.fn(jsToJs));
  });

  it('wraps template function', function (done) {
    var testFunctionFilename = join(__dirname, 'test-function-template.js');
    jsToJs(testFunctionFilename, { foo: 42 }, function (ignored, source) {
      la(check.unemptyString(source), 'has transformed source', source);
      var safeEval = eval;
      var result = safeEval(source);
      la(result === 42, 'test function returns wrong result', result);
      done();
    });
  });
});
