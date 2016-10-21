var pmongo = require('promised-mongo');
var config = require('config');
var db = pmongo(config.db.url, ['users']);

module.exports = function (decodedToken, cb) {
    db.users.findOne({_id: pmongo.ObjectId(decodedToken.id)}).then(function (user) {
        if (user) {
            cb(null, true, user);
        } else {
            // can't set error field s new Error() and string will end up as a response
            cb(null, false, {});
        }
    }).catch(function (err) {
        cb(err, false, {}); // this may cause a server 500, with the real error hidden away
    });
};