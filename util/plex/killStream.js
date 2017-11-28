const plexApi = require('plex-api');
module.exports = (plexClient, streamId, reason) =>
{
    const p = new Promise((resolve, reject) => 
    {
        plexClient.perform(`/status/sessions/terminate?sessionKey=${streamId}&reason=${reason}`).then(function () {
            resolve();
        }, function (err) {
            reject(err);
        });
    });
};