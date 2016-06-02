'use strict';

var express = require('express'),
    request = require('supertest'),
    bodyParser = require('body-parser'),
    zlib = require('zlib');

// Add zlib parsing to bodyParser.
// In real-life you'd `require('body-parser-zlib')`.
require('./index.js')(bodyParser);

describe('Zlib Body Parser', function() {
    var app;

    var createServer = function(options) {
        app = express();
        app.set('env', 'test');
        app.use(bodyParser.zlib(options));
        app.post('/', function(req, res) {
            console.log("hallo")
            res.status(200).send({ parsed: req.body });
        });
    };

    beforeEach(function() {
        app = null;
    });

    it('should parse a body with content-type application/xml', function(done) {
        console.log("bier")
        createServer();
        console.log("bier2")
        request(app)
            .post('/')
            .set('Content-Type', 'application/xml')
            .send(zlib.gzip('<customer><name>Bob</name></customer>'))
            .expect(200, '<customer><name>Bob</name></customer>', done);
    });

});