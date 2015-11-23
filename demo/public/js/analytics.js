(function initAnalytics() {
  console.log('trying analyticsConfig object');
  if (typeof analyticsConfig === 'undefined') {
    throw new Error('Cannot find analyticsConfig object');
  }
  console.log('analytics config object');
  console.log(analyticsConfig);
  if (analyticsConfig.analyticsId !== '4xx-xxxxx') {
    throw new Error('Unexpected analytics id ' + analyticsConfig.analyticsId);
  }
  console.log('Analytics id configured correctly');
}());
