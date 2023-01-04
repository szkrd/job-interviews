var prequire = require('proxyquire');
require('shelljs/global');
var Hapi = require('hapi');
var config = require('config');
var logger = {};

function resetLogger () {
    logger.info = sinon.spy();
    logger.warn = sinon.spy();
    return logger;
}

// I don't want to see the console polluted during tests
var model = prequire('userModel', {
    'simple-node-logger': {
        // we can't return an empty object for now
        createSimpleLogger: function () { return resetLogger(); }
    }
});

// expose hapi mongodb library internals;
// hapi server.inject had no real/populated plugins object somehow
var plugin = {expose: function (key, value) { this[key] = value; }};

describe('userModel', function() {

    var somebody = {
        name: 'Bruce Wayne',
        email: 'bruce@wayneindustries.com'
    };

    var someoneElse = {
        name: 'Peter Parker',
        email: 'peter.parker@empirestateuniversity.edu'
    };

    beforeEach('acquire hapi mongo plugin', function (done) {
        resetLogger();
        require('hapi-mongodb-promises').register(plugin, config.db, function () {
            model.init(plugin);
            done();
        });
    });

    afterEach('flush database collection', function (done) {
        plugin.remove('users').then(function () { done(); });
    });


    describe('saveUser', function() {

        // co / comocha + catch seems to cause problems, which kinda sucks:
        // https://github.com/ilkkao/co-mocha/issues/3
        it('should generate a token for the user that is about to be saved in the db', function* (done) {
            try {
                var saved = yield model.saveUser(somebody);
                expect(saved.token).to.be.a('string');
                expect(logger.info.called).to.be.true;
                done();
            } catch (e) { done(e); } // kabooom
        });

        it('should not save the user if the email address already exists', function (done) {
            model.saveUser(somebody)
                .then(function (saved) {
                    expect(logger.info.called).to.be.true;
                    return model.saveUser(somebody);
                })
                // we have a sophisticated catch here, let me skip co
                .catch(function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    expect(err.message).to.contain('Database error');
                    expect(logger.warn.called).to.be.true;
                    plugin.find('users').then(function (data) {
                        expect(data.length).to.equal(1);
                        done();
                    });
                });
        });

        it('should saved the user into the db', function* (done) { try {
            yield model.saveUser(somebody);
            var data = yield plugin.find('users');
            expect(data.length).to.equal(1);

            yield model.saveUser(someoneElse);
            data = yield plugin.find('users');
            expect(data.length).to.equal(2);

            done();
        } catch (e) { done(e); }});

    }); // end of saveUser


    describe('getUsers', function() {

        it('should list users in the db (name and email only) - auth is handled by hapi-jwt', function* (done) { try {
            var saved = yield model.saveUser(somebody);
            yield model.saveUser(someoneElse);
            var users = yield model.getUsers();

            expect(users.length).to.equal(2);
            expect(users[0].name).to.equal(somebody.name);
            expect(users[1].name).to.equal(someoneElse.name);
            expect(users[1]._id).to.be.an('undefined'); // must be filtered out

            done();
        } catch (e) { done(e); }});

        it('should not return an empty array if there are no users in the db', function* (done) { try {
            var users = yield model.getUsers();
            expect(users).to.be.an('array');
            expect(users).to.be.empty;
            done();
        } catch (e) { done(e); }});

    }); // end of getUsers

}); // end of userModel
