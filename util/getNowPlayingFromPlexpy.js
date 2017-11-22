const request = require('request');
const getSettings = require('../util/getSettings');
module.exports = (guildId) => 
{
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
            {
                settings = JSON.parse(settings);
                let host = settings.find(x => x.setting == "plexpy.host").value;
                let baseurl = settings.find(x => x.setting == "plexpy.baseurl").value;
                let apikey = settings.find(x => x.setting == "plexpy.apikey").value;
                let url = `http://${host}${baseurl}/api/v2?apikey=${apikey}&cmd=get_activity`;
                request(url, function (e, r, b) {
                    let j = JSON.parse(b);
                    if (e && r.statusCode !== 200) reject(e);
                    resolve(j.response);
                });
            }
        );
    });
    return p;
}