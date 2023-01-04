var config = require('config');
var validator = require('tokenValidator');
var logger = {};

// knock out logger
function resetLogger () {
    logger.info = sinon.spy();
    logger.warn = sinon.spy();
    return logger;
}
var model = prequire('userModel', {'simple-node-logger': {createSimpleLogger: function () { return resetLogger(); }}});

// fake mongo accessor
var plugin = {expose: function (key, value) { this[key] = value; }};

describe('tokenValidator', function() {

    var somebody = {
        name: 'Peter Norton',
        email: 'peter@commander.com'
    };

    beforeEach('reset logger and acquire hapi mongo plugin', function (done) {
        resetLogger();
        require('hapi-mongodb-promises').register(plugin, config.db, function () { model.init(plugin); done(); });
    });

    afterEach('flush database collection', function (done) {
        plugin.remove('users').then(function () { done(); });
    });

    it('should find a user by a mongo id and then callback, expects success true in callback', function () {
        model.saveUser(somebody).then(function (saved) {
            validator({id: saved._id}, function (err, success, user) {
                expect(success).to.be.true;
                done();
            });
        });
    });

    it('should not find a user in an empty database (id still supplied), expects false success in callback', function () {
        var brokenId = '1234567890AB';
        validator({id: brokenId}, function (err, success, user) {
            expect(success).to.be.false;
            done();
        });
    });

}); // end of tokenValidator
