'use strict';

/**
 * Module dependencies.
 */
var zlib = require('zlib');
var typeis = require('type-is');
var debug = require('debug')('body-parser:zlib');
var bytes = require('bytes');
var iconv = require('iconv-lite');

module.exports = function (bodyParser) {
    if (bodyParser.zlib) {
        // We already setup the zlib parser.
        // End early.
        return;
    }


    /**
     * Create a middleware to parse gziped bodies.
     *
     * @param {object} [options]
     * @return {function}
     * @api public
     */
    function zlib(options) {
        var opts = options || {};

        var verify = opts.verify || false;

        if (verify !== false && typeof verify !== 'function') {
            throw new TypeError('option verify must be function')
        }

        // assert charset is supported
        if (opts.encoding === null && encoding !== null && !iconv.encodingExists(encoding)) {
            return next(createError(415, 'unsupported charset "' + encoding.toUpperCase() + '"', {
                charset: encoding.toLowerCase()
            }))
        }

        return function zlibParser() {
            if (req._body) {
                return debug('body already parsed'), next()
            }

            req.body = req.body || {};

            // skip requests without bodies
            if (!typeis.hasBody(req)) {
                return debug('skip empty body'), next();
            }

            debug('content-type %j', req.headers['content-type']);

            // determine if request should be parsed
            if (!shouldParse(req)) {
                return debug('skip parsing'), next()
            }

            req.addListener("data", function (chunk) {
                data.push(new Buffer(chunk));
            });
            req.addListener("end", function () {
                var buffer = Buffer.concat(data);
                zlib.inflate(buffer, function (err, result) {
                    if (!err) {
                        req._body = true;
                        req.body = result.toString();
                        next();
                    } else {
                        next(err);
                    }
                });
            });
        };



    }
    // Finally add the `xml` function to the bodyParser.
    Object.defineProperty(bodyParser, 'zlib', {
        configurable: true,
        enumerable: true,
        get: function () {
            return zlib;
        }
    });
};