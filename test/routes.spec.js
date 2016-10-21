var prequire = require('proxyquire');
var Hapi = require('hapi');
var jwt = require('jsonwebtoken'); 
var config = require('config');
var logger = {};

// logging, do it before require server (and mangle the require cache? possibly)... yuck
function resetLogger() {
    logger.info = sinon.spy();
    logger.warn = sinon.spy();
    return logger;
}
var model = prequire('userModel', {
    'simple-node-logger': {createSimpleLogger: function () { return resetLogger(); }}
});

var server = require('../');
server.register(require('inject-then'), function (err) { if (err) throw err; }); // promisifed inject

describe('routes', function () {

    beforeEach(function () {
        resetLogger();
    });

    describe('postRegistration', function () {

        it('should not be accessible just via /registration', function* (done) {
            var res = yield server.injectThen('/registration');
            expect(res.statusCode).to.equal(404);
            done();
        });

        it('should be available at /registration with name and email as a POST payload', function* (done) {
            var res = yield server.injectThen({
                method: 'POST',
                url: '/registration',
                payload: {name: 'John Doe', email: 'johndoe@example.com'}
            });
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    describe('getUsers', function () {

        it('should be available at /users, jwt auth is mandatory', function* (done) { try {
            var res = yield server.injectThen('/users/');
            expect(res.statusCode).to.equal(401);
            done();
        } catch (e) { done(e); }});

        it('should be available at /users/token but responds with success false if the token is incorrect', function* (done) {
            // this is structurally valid
            var invalidToken = jwt.sign({id: '123456123456'}, config.secret);
            var res = yield server.injectThen({
                    url: '/users/',
                    headers: {Authorization: 'Bearer ' + invalidToken}
                });
            expect(res.result.error).to.contain('Unauthorized');
            expect(res.result.message).to.contain('Invalid token');
            expect(res.statusCode).to.equal(401);
            done();
        });

        it('should return all the users for a proper token', function* (done) {
            var message;
            logger.info = function (action, payload) { message = payload; }; // get it from the log: scary
            // insert Jane
            yield server.injectThen({
                method: 'POST',
                url: '/registration',
                payload: {name: 'Jane Doe', email: 'janedoe@example.com'}
            });
            // insert Jill
            yield server.injectThen({
                method: 'POST',
                url: '/registration',
                payload: {name: 'Jill Doe', email: 'jilldoe@example.com'}
            });
            // get users with retrieved token
            var res = yield server.injectThen({
                    url: '/users/',
                    headers: {Authorization: 'Bearer ' + message.token}
                });

            expect(res.statusCode).to.equal(200);
            expect(res.result).to.be.instanceof(Array);
            expect(res.result.length).to.be.greaterThan(1);
            done();
        });

    }); // end of getUsers

}); // end of rooutes
