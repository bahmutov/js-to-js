// this template is different because it will do everything
// not just export options as a variable
module.exports = function initGoogleAnalytics(options) {
  console.log('google analytics is a good example of templated script for 3rd party snippet');

  if (!options || !options.googleAnalyticsId) {
    throw new Error('missing google analytics id');
  }

  console.log('injected analytics id', options.googleAnalyticsId);

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', options.googleAnalyticsId, 'auto');
  ga('send', 'pageview');
};
