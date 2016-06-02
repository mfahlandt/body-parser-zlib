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
        console.log("here2")
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
        console.log("here3")
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
            console.log("here4")
            if (req._body) {
                console.log("not here!")
                return debug('body already parsed'), next()
            }
            req.body = req.body || {};
console.log("here")
            // skip requests without bodies
            if (!typeis.hasBody(req)) {
                console.log("not here!")
                return debug('skip empty body'), next();
            }

            debug('content-type %j', req.headers['content-type']);
            
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