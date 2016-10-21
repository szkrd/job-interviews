// this is a bit hackish, but I couldn't move this code to
// the test wrapper for some reason (try harder?)
require('shelljs/global');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var config = require('config');

// modify global config, create temp directory
before('before everything', function () {
    mkdir(config.smtpPickupPath);
});

// remove temporary stuff
after('finally', function () {
    rm('-rf', config.smtpPickupPath);
    MongoClient.connect(config.db.url, function (err, db) {
        if (err) {
            return console.log('Error! MongoDB vs test teardown:', err);
        }
        var collection = db.collection('users');
        collection.remove(function (err, result) { db.close(); });
    });
});