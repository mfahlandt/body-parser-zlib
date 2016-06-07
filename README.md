# gzip Body Parser

Adds zlib as parser to the [body-parser](https://github.com/expressjs/body-parser) library, so you can convert incoming gzipped data into a string representation.

This is really useful if you want to read gziped requests to save size

[![Build Status](https://travis-ci.org/point-of-media/body-parser-zlib.svg?branch=master)](https://travis-ci.org/mfahlandt/body-parser-zlib)
[![npm version](https://badge.fury.io/js/body-parser-xml.svg)](http://badge.fury.io/js/body-parser-zlib)
[![Dependency Status](https://david-dm.org/point-of-media/body-parser-zlib.svg)](https://david-dm.org/mfahlandt/body-parser-zlib)
[![devDependency Status](https://david-dm.org/point-of-media/body-parser-zlib/dev-status.svg)](https://david-dm.org/mfahlandt/body-parser-zlib#info=devDependencies)

## Installation

```
npm install --save express body-parser body-parser-zlib
```

## Usage

This library adds a `zlib` method to the `body-parser` object.

Initialise like so:

``` js
var bodyParser = require('body-parser');
require('body-parser-zlib')(bodyParser);
```

Once initialised, you can use it just like any other `body-parser` middleware:

``` js
var app = require('express')();
app.use(bodyParser.zlib());
```

This will parse any gzipped request and place it as a JavaScript object on `req.body` for your route handlers to use.


## Example

``` js
var express = require('express'),
    bodyParser = require('body-parser');

require('body-parser-zlib')(bodyParser);

var app = express();
app.use(bodyParser.zlib());

app.post('/users', function(req, res, body) {
  // Any request with an Zlib payload will be parsed
  // and a String produced on req.body
  // corresponding to the request payload.
  console.log(req.body);
  res.status(200).end();
});

```

For Single routes

``` js
var express = require('express'),
    bodyParser = require('body-parser');
var zlibParser;

var app = express();
require('body-parser-zlib')(bodyParser);
zlibParser = bodyParser.zlib();

app.post('/users', zlibParser, function(req, res, body) {
  // Any request to this route with a 
  // Zlib payload will be parsed
  // and a String produced on req.body
  // corresponding to the request payload.
  console.log(req.body);
  res.status(200).end();
});

```
## Motivation

This library was born out of a frustration that [body-parser](https://github.com/expressjs/body-parser) doesn't support parsing gzipped content if the corresponding header was not set.
The provided functionality gives you the ability to control when you want to decompress a request regardless of the headers set. This makes it especially useful when communicating with legacy systems.


## License

GPL General Public License v3.0
