var _ = require('lodash');
var co = require('co');
var Joi = require('joi');
var log = require('simple-node-logger').createSimpleLogger();
var model = require('userModel');
var email = require('emailSender');

function handler (request, reply) {
    // I rewrote this from vanilla promises to co (see history), but I must admit,
    // harmony on windows is a huge pain in the ass...
    // (I didn't trust co-hapi either, for top level error catching seems to be a problem for me)
    co(function* () {
        var user = _.pick(request.payload, ['name', 'email']);
        model.init(request.server.plugins['hapi-mongodb-promises']);
        var savedUser = yield model.saveUser(user);
        yield email.send(savedUser);
        reply({success: true});
    }).catch(function (err) {
        reply({success: false, error: err.message});
    });
}

module.exports = {
    // options: {
    //     id: 'postRegistration'
    // },
    method: 'POST',
    path: '/registration',
    handler: handler,
    config: {
        validate: {
            payload: {
                name: Joi.string().min(1).max(128),
                email: Joi.string().email()
            }
        }
    }
};