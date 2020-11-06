const tmi = require('tmi.js');

export const urlParams = new URLSearchParams(window.location.search);

export const client = new tmi.Client({
    options: {debug: true},
    connection: {
        reconnect: true,
        secure: true
    },
    channels: [`#${urlParams.get("username")}`]
});
