/* eslint no-console:0 */
module.exports = function testFunction(options) {
  // console.log('testFunction');
  // console.log(options);

  console.assert(options, 'has options object');
  console.assert(options.foo, 'has options.foo property');
  console.assert(options.foo === 42, 'valid foo value');
  return options.foo;
};
