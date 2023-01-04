var mongoPort = process.env.MONGO_PORT || 27017;

var config = {
    port: process.env.PORT || 3000,
    smtpPickupPath: __dirname + '/../smtpPickup',
    mailFrom: 'Szabolcs Kurdi <szabolcs.kurdi@gmail.com>',
    db: {url: `mongodb://localhost:${mongoPort}/local`},
    secret: 'Bora Horza Gobuchul'
};

if (process.env.NODE_ENV === 'TEST') {
    config.smtpPickupPath += 'Temp';
    config.port = process.env.PORT || 3001;
    config.db = {url: `mongodb://localhost:${mongoPort}/test`};
}

module.exports = config;
