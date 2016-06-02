# XML Body Parser

Adds zlib as parser to the [body-parser](https://github.com/expressjs/body-parser) library, so you can convert incoming gziped data into a string representation.

This is really useful if you want to read gziped requests to save size

[![Build Status](https://travis-ci.org/mfahlandt/body-parser-zlib.svg?branch=master)](https://travis-ci.org/mfahlandt/body-parser-zlib)
[![npm version](https://badge.fury.io/js/body-parser-xml.svg)](http://badge.fury.io/js/body-parser-zlib)
[![Dependency Status](https://david-dm.org/mfahlandt/body-parser-zlib.svg)](https://david-dm.org/mfahlandt/body-parser-zlib)
[![devDependency Status](https://david-dm.org/mfahlandt/body-parser-zlib/dev-status.svg)](https://david-dm.org/mfahlandt/body-parser-zlib#info=devDependencies)

## Installation

```
npm install --save express body-parser body-parser-zlib
```

## Usage

This library adds an `zlib` method to the `body-parser` object.

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

This will parse any gziped request and place it as a JavaScript object on `req.body` for your route handlers to use.


### Options

You can also pass in options:

``` js
app.use(bodyParser.zlib(options));
```

The `options` object accepts any of the following keys:

#### defaultCharset

Specify the default character set for the text content if the charset is not specified in the `Content-Type` header of the request. Defaults to `utf-8`.

#### limit

Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the [bytes](https://www.npmjs.com/package/bytes) library for parsing. Defaults to `'100kb'`.

#### verify

The `verify` option, if supplied, is called as `verify(req, res, buf, encoding)`, where `buf` is a `Buffer` of the raw request body and `encoding` is the encoding of the request. The parsing can be aborted by throwing an error.

#### xmlParseOptions

This option controls the behaviour of the XML parser. You can pass any option that is supported by the [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) library: [see here](https://github.com/Leonidas-from-XIV/node-xml2js#options) for a list of these options.

## Example

``` js
var express = require('express'),
    bodyParser = require('body-parser');

require('body-parser-zlib')(bodyParser);

var app = express();
app.use(bodyParser.zlib({
  limit: '1MB'   // Reject payload bigger than 1 MB
}));

app.post('/users', function(req, res, body) {
  // Any request with an Zlib payload will be parsed
  // and a String produced on req.body
  // corresponding to the request payload.
  console.log(req.body);
  res.status(200).end();
});

```

## Motivation

This library was born out of a frustration that [body-parser](https://github.com/expressjs/body-parser), doesn't support parsing gziped content, if the header was not set, so for old systems you can use this


## License

MIT