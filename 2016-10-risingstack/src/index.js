var Hapi = require('hapi');
var config = require('config');
var validator = require('tokenValidator');
var server = new Hapi.Server();

server.connection({port: config.port});

server.register([
    {
        register: require('hapi-mongodb-promises'),
        options: config.db
    },
    {
        register: require('hapi-auth-jwt')
    }
], function (err) {
    if (err) {
        console.error('Failed to load a plugin:', err);
        throw err;
    }
    server.auth.strategy('token', 'jwt', {
        key: config.secret,
        validateFunc: validator
    });

    server.route(require('routes/getUsers'));
    
    server.route(require('routes/postRegistration'));
});



server.start(function () {
    console.log('Server running at:', server.info.uri);
});

module.exports = server;
