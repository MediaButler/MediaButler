const plexApi = require('plex-api');
module.exports = (plexClient) =>
{
    const p = new Promise((resolve, reject) => 
    {
        plexClient.query(`/status/sessions`).then(function (res) {
            resolve(res);
        }, function (err) {
            console.log(err);
            reject(err);
        });
    });
};
