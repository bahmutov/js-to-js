(function initAnalytics(id) {
  if (!id) {
    console.error('missing analytics id ' + id);
    console.log('trying analyticsConfig object');
    if (typeof analyticsConfig === 'undefined') {
      console.error('Cannot find analyticsConfig object');
    }
    console.log('analytics config object');
    console.log(analyticsConfig);
    id = analyticsConfig.analyticsId;
    return;
  }
  console.log('initialized analytics with id', id);
}(typeof analyticsId === 'undefined' ? '' : analyticsId));
