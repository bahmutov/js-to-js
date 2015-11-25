/* global describe, it */
var la = require('lazy-ass');
var check = require('check-more-types');

describe('js-to-js as middleware', function () {
  var jsToJs = require('..');

  it('returns middleware function', function () {
    var fn = jsToJs('myTest', { foo: 42 });
    la(check.fn(fn), 'should return middleware', fn);
  });
});
