const request = require('request');
const getSettings = require('../util/getPlexPySettings');
module.exports = (guildId, user, results = 3) => 
{
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
        {               
            let url = `${settings.protocol}://${settings.host}/${settings.path}/api/v2?apikey=${settings.apikey}&cmd=get_history&length=${results}&user=${user}`;
            request(url, function (e, r, b) {
                let j = JSON.parse(b);
                if (e && r.statusCode !== 200) reject(e);
                resolve(j.response);
            });
        }).catch((e) => { reject(e); });
    });
    return p;
}