var expect = require('chai').expect;
require('shelljs/global');
var emailSender = require('emailSender');

describe('emailSender', function() {
    describe('send', function() {

        var somebody = {
            email: 'peter.venkman@ghostbusters.com',
            name: 'Dr. Peter Venkman',
            token: 'a1b2c3d4e5f6'
        };

        it('should return a promise', function () {
            var es = emailSender.send({});
            expect(es.then).to.be.a('function');
        });

        it('should expect an object with "name", "email" and "token", so that it can render a template', function (done) {
            emailSender.send(somebody).then(function (resp) {
                expect(resp.endsWith('.eml')).to.be.true;
                done();
            });
        });

        it('should render a template as html bodied email', function (done) {
            emailSender.send(somebody).then(function (resp) {
                var body = cat(resp);
                expect(body).to.contain('Content-Type: text/html');
                done();
            });
        });

        it('should contain all three parameters as rendered strings', function (done) {
            emailSender.send(somebody).then(function (resp) {
                var body = cat(resp).replace(/[\r\n\t]/g, '');
                expect(body).to.contain(somebody.email);
                expect(body).to.contain(somebody.name);
                expect(body).to.contain(somebody.token);
                done();
            });
        });

    }); // end of send
}); // end of emailSender
