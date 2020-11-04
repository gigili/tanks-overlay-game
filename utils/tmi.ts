const tmi = require('tmi.js');

export const client = new tmi.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    channels: ["#gacbl"]
});
