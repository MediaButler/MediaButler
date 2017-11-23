const request = require('request');
const getSettings = require('../util/getPlexPySettings');
module.exports = (guildId) => 
{
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
        {   
            let url = `${settings.protocol}://${settings.host}/${settings.path}/api/v2?apikey=${settings.apikey}&cmd=get_activity`;
            request(url, function (e, r, b) {
                let j = JSON.parse(b);
                if (e && r.statusCode !== 200) reject(e);
                resolve(j.response);
            });
        });
    });
    return p;
}