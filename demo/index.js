/* eslint no-console:0 */
var express = require('express');
var morgan = require('morgan');
var app = express();
var path = require('path');
var join = path.join;

var jsToJs = require('js-to-js');

var viewsFolder = join(__dirname, 'views');
app.set('views', viewsFolder);
app.locals.pretty = true;

app.use(morgan('dev'));

app.engine('js', jsToJs);

app.get('/js/analytics-config.js', function (req, res) {
  console.log('rendering js file', req.url);
  res.setHeader('content-type', 'application/javascript');
  // WRT the views folder
  res.render('js/analytics-config.js', {
    analyticsId: '4xx-xxxxx'
  });
});

app.get('/js/google-analytics-example.js', function (req, res) {
  res.setHeader('content-type', 'application/javascript');
  res.render('js/google-analytics-example.js', {
    googleAnalyticsId: 'this-is-a-demo'
  });
});

app.use(express.static(join(__dirname, 'public')));
var port = process.env.PORT || 3000;
var server = app.listen(port);

console.log('listening at port %d',
  server.address().port);
