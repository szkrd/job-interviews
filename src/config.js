var config = {
    port: 3000,
    smtpPickupPath: __dirname + '/../smtpPickup',
    mailFrom: 'Szabolcs Kurdi <szabolcs.kurdi@gmail.com>',
    db: {url: 'mongodb://localhost:27019/local'},
    secret: 'Bora Horza Gobuchul'
};

if (process.env.NODE_ENV === 'TEST') {
    config.smtpPickupPath += 'Temp';
    config.port = 3001;
    config.db = {url: 'mongodb://localhost:27019/test'};
}

module.exports = config;