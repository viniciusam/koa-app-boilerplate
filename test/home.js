var agent = require('supertest');
var assert = require('assert');
var app = require('../src/app');

describe('Home', function() {

    var server;

    before(function() {
        // Test using a different port.
        server = app.listen(3001);
    });

    after(function() {
        server.close();
    });

    it('should return hello world', function(done) {
        agent(server)
            .get('/v1')
            .expect(function(res) {
                assert.equal(res.body.message, 'Hello world!');
            })
            .expect(200, done);
    });

});
