# js-to-js

> ExpressJS template engine to render JavaScript from JavaScript
> to avoid inlined code and allow strict and safe Content-Security-Policy.

Live demo at [js-to-js.herokuapp.com](http://js-to-js.herokuapp.com/)

[![NPM][js-to-js-icon] ][js-to-js-url]

[![manpm](https://img.shields.io/badge/manpm-%E2%9C%93-3399ff.svg)](https://github.com/bahmutov/manpm)
[![Circle CI][ci-badge] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]

[js-to-js-icon]: https://nodei.co/npm/js-to-js.png?downloads=true
[js-to-js-url]: https://npmjs.org/package/js-to-js
[ci-badge]: https://circleci.com/gh/bahmutov/js-to-js.svg?style=svg
[ci-url]: https://circleci.com/gh/bahmutov/js-to-js
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

Read the following blog posts

* [Disable inline JavaScript for security][disable js post]
* [JavaScript to JavaScript template language][js-to-js post]

[disable js post]: http://glebbahmutov.com/blog/disable-inline-javascript-for-security/
[js-to-js post]: http://glebbahmutov.com/blog/javascript-to-javascript-template-engine/

## Install

    npm install --save js-to-js

## Simple example

Inside your [ExpressJS][express] server use it as a template engine for 'js' files

```js
var express = require('express');
var app = express();

var viewsFolder = join(__dirname, 'views');
app.set('views', viewsFolder);

var jsToJs = require('js-to-js');
app.engine('js', jsToJs);
app.locals.pretty = true; // render pretty output, don't minify for now

// when asked for 'js/analytics-config.js', render it dynamically
app.get('/js/analytics-config.js', function (req, res) {
  // use this for correct content-type -
  // Express will think it is text/html by default
  res.setHeader('content-type', 'application/javascript');
  // this path is WRT views folder
  res.render('js/analytics-config.js', {
    // use any run-time values, for example from config
    analyticsId: '4xx-xxxxx'
  });
});
```

[express]: http://expressjs.com/

## The input object file

By default we expect the input views to be plain CommonJS modules exporting and object.
The files are loaded using NodeJS `require` call. For example the `views/js/analytics-config.js`
file might be just an object with single property.

```js
module.exports = {
  analyticsId: 'default-id'
};
```

The CommonJS format is simple to use and test.

## The rendered script file

The rendered file will have a single variable declared with the value being the object
from the input file, but the values replaced / extended using dynamic values.

The name of the variable will be the [kebab case][kebab] of the base name of the requested file.
For example if the input file is `views/js/analytics-config.js` and rendered using options

```js
{
  analyticsId: '0123456',
  user: 'john@gmail.com',
  UUID: 'abcd012345'
}
```

then the produced JavaScript file will contain only the following code

```js
var analyticsConfig = {
  analyticsId: '0123456'
};
```

Limiting the keys to only the ones already in the input file is done for modularity.

[kebab]: https://lodash.com/docs#kebabCase

## Wrapping a function example

If you need to inject values into a 3rd party script, like Google Analytics,
export a function that expects options argument. The function will be wrapped
in an IIFE with actual arguments passed in.

```js
// analytics.js in the views folders
module.exports = function (options) {
  initAnalytics(options.userId);
};
```

You route can be setup exactly like before

```js
var userId = 'xx-yy-bb';
app.get('/js/analytics.js', function (req, res) {
  res.setHeader('content-type', 'application/javascript');
  res.render('analytics.js', {
    userId: userId
  });
});
```

At runtime it will be rendered back to the user something like this

```js
(function (options) {
  initAnalytics(options.userId);
}({ userId: 'xx-yy-bb' }));
```

## Using as middleware

Sometimes you have a simple object with settings you just want to send to the
client, but generate a script variable. Just use `js-to-js` as middleware generator.

```js
var jsToJs = require('js-to-js');
app.get('/js/demo-config-object.js',
  jsToJs('demoConfig', { foo: 42, bar: 21 }));
```

Whenever the client requests `/js/demo-config-object.js` the server will respond
with dynamically generated script with the following contents

```js
var demoConfig = { foo: 42, bar: 21};
```

## Working example / demo

This repository [bahmutov/js-to-js][repo] contains fully working example in the
[demo][demo folder] subfolder. You can run it locally using

    git clone git@github.com:bahmutov/js-to-js.git
    cd js-to-js/demo
    npm install
    node index.js
    open http://localhost:3000/index.html

You can also see it deployed at [js-to-js.herokuapp.com][deployed].

![demo](images/js-to-js.png)

[repo]: https://github.com/bahmutov/js-to-js
[demo folder]: https://github.com/bahmutov/js-to-js/tree/master/demo
[deployed]: http://js-to-js.herokuapp.com/

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/js-to-js/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

