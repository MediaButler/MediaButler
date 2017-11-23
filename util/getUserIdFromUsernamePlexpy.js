const getSettings = require('./getPlexPySettings');
const request = require('request');
module.exports = (guildId, username) => 
{
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
            {
                let url = `${settings.protocol}://${settings.host}/${settings.path}/api/v2?apikey=${settings.apikey}&cmd=get_users`;
                request(url, function (e, r, b) {
                    let j = JSON.parse(b);
                    let u = j.response.data.find(o => o.username === username);
                    if (u === undefined) reject("Unable to match user");
                    resolve(u.user_id);
                });
            }
        );
    });
    return p;
}