var express = require('express');
var morgan = require('morgan');
var app = express();
var path = require('path');
var join = path.join;
var _ = require('lodash');

var jsToJs = require('js-to-js');

var viewsFolder = join(__dirname, 'views');
app.set('views', viewsFolder);
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(morgan('dev'));

var read = require('fs').readFileSync;
app.engine('js', jsToJs);

app.get('/js/analytics-config.js', function (req, res) {
  console.log('rendering js file', req.url);
  res.render('js/analytics-config.js', {
    analyticsId: '4xx-xxxxx'
  });
});

app.use(express.static(join(__dirname, 'public')));

app.get('/', function (req, res) {
  console.log('rendering index');
  res.render('index', {
    title : 'Home',
    analyticsId: '4xx-xxxxx'
  });
});

var port = 3000;
app.listen(port);
console.log('listening at port %d', port);
