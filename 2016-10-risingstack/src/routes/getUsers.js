var Joi = require('joi');
var model = require('userModel');

function handler (request, reply) {
    model.init(request.server.plugins['hapi-mongodb-promises']);
    model.getUsers()
        .then(function (resp) { reply(resp); })
        .catch(function (err) { reply({success: false, error: err.message}); });
}

module.exports = {
    // options: {
    //     id: 'getUsers'
    // },
    method: 'GET',
    path: '/users/',
    handler: handler,
    config: {
        auth: 'token'
    }
};
