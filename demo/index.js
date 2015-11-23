var express = require('express');
var morgan = require('morgan');
var app = express();
var path = require('path');
var join = path.join;
var _ = require('lodash');

var viewsFolder = join(__dirname, 'views');
app.set('views', viewsFolder);
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(morgan('dev'));

var read = require('fs').readFileSync;
app.engine('js', function (filePath, options, callback) {
  console.log('need to render js file %s', filePath);
  console.log('with options', options);
  var loaded = require(filePath);
  // expected loaded to be an object,
  // now merge with given settings
  var configured = _.pick(options, Object.keys(loaded));
  var src = options.pretty ?
    JSON.stringify(configured, null, 2) : JSON.stringify(configured);

  var baseName = path.basename(filePath, '.js');
  var asName = _.camelCase(baseName);
  console.log('configured options under name %s', asName);
  console.log(configured);
  return callback(null, 'var ' + asName + ' = ' + src + ';\n');
});

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
