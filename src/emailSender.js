var _ = require('lodash');
var handlebars = require('handlebars');
var fs = require('fs');
var nodemailer = require('nodemailer');
var pickupTransport = require('nodemailer-pickup-transport');
var config = require('config');

var transporter = nodemailer.createTransport(pickupTransport({
    directory: config.smtpPickupPath
}));

// common options
var mailOptions = {from: config.mailFrom};

function render(template, data) {
    var fileName = __dirname + '/emailTemplates/' + template + '.hbs';
    var promise = new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(err, contents){
            if (err) {
                return reject(new Error(err));
            }
            var template = handlebars.compile(contents.toString());
            resolve(template(data));
        });
    });
    return promise;
}

// user must have an
// .email
// .name
// .callbackUrl
function send (user) {
    return new Promise(function (resolve, reject) {
        render('callbackMail', user)
            .then(function (html) {
                transporter.sendMail(_.assign({ // no Object.assign
                    to: user.email,
                    subject: 'API access',
                    html: html
                }, mailOptions), function (err, info) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(info.path || info.response); // pickup vs stub
                    }
                });
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

module.exports = {
    send: send
};
