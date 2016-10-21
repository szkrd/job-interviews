// uses mongodb to store/retrieve data
// ===================================

var _ = require('lodash');
var jwt = require('jsonwebtoken'); // don't use the simple version
var log = require('simple-node-logger').createSimpleLogger();
var crypto = require('crypto');
var config = require('config');
var uid = 0;
var mongo;

function init (hapiMongo) {
    mongo = hapiMongo;
}

function saveUser (user) {
    var shaSum = crypto.createHash('sha1'); // always rehash
    //var token = shaSum.update(user.email + salt + uid++).digest('hex'); // + Date.now()
    var savable = {name: user.name, email: user.email};
    return new Promise(function (resolve, reject) {
        mongo.find('users', {email: user.email})
            .then(function (result) {
                if (result && result.length) {
                    log.warn('Email already exists:', user.email);
                    reject(new Error('Database error!')); // be obscure here
                } else {
                    mongo.insertOne('users', savable)
                        .then(function (saved) {
                            saved.token = jwt.sign({id: saved._id}, config.secret);
                            log.info('saved: ', saved); // let us know the token
                            resolve(saved);
                        })
                        .catch(function () { reject(new Error('Error saving user!')); });
                }
            });
    });
}

function getUsers () {
    return new Promise(function (resolve, reject) {
        mongo.find('users')
            .then(function (result) {
                // empty db?
                if (!result) {
                    return resolve([]);
                }
                result = result.map(function (user) { return _.pick(user, ['name', 'email']); });
                return resolve(result);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

module.exports = {
    init: init,
    saveUser: saveUser,
    getUsers: getUsers
};
