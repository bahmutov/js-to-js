console.log('verifying demo config object');
if (typeof demoConfig !== 'object') {
  throw new Error('Cannot find demoConfig');
}
console.log(demoConfig);
if (demoConfig.foo !== 42 ||
  demoConfig.bar !== 21) {
  throw new Error('Wrong values in the demoConfig ' + JSON.stringify(demoConfig));
}
console.log('printed demo config object');
