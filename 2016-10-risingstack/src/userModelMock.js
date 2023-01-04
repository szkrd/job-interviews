// basic in-memory version
// =======================

var _ = require('lodash');
var log = require('simple-node-logger').createSimpleLogger();
var crypto = require('crypto');
var salt = 'Consider Phlebas';
var uid = 0;
var users = [];

function saveUser (user) {
    var shaSum = crypto.createHash('sha1'); // always rehash
    var token = shaSum.update(user.email + salt + uid++).digest('hex');
    var savable = {name: user.name, email: user.email, token: token};
    log.info('saving: ', savable);
    users.push(savable);
    return savable;
}

function _getUsers () {
    return users;
}

function getUsers (token) {
    var users = _getUsers();
    if (_.filter(users, {token: token}).length) {
        users = users.map(function (u) { return _.pick(u, ['name', 'email']); });
        log.info('retrieved users for #', token, users);
        return users;
    }
}

module.exports = {
    saveUser: saveUser,
    getUsers: getUsers
};
