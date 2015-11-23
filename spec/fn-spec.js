/* global describe, it */
var la = require('lazy-ass');
var check = require('check-more-types');

describe('js-to-js exported config function handling', function () {
  var jsToJs = require('..');

  it('is a function', function () {
    la(check.fn(jsToJs));
  });
});
