const tmi = require('tmi.js');

export const client = new tmi.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: 'maximobot', //process.env.BOT_NAME,
        password: 'oauth:iuzrkypu24xwo7xd9jp88jbaosqpxp',
    },
    channels: ["#gacbl"]
});
