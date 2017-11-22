const getSettings = require('./getSettings');
const request = require('request');
module.exports = (guildId, userId) => 
{
    const p = new Promise(
        function (resolve, reject) {
            getSettings(guildId)
            .then((settings) =>
                {
                    settings = JSON.parse(settings);
                    let host = settings.find(x => x.setting == "plexpy.host").value;
                    let baseurl = settings.find(x => x.setting == "plexpy.baseurl").value;
                    let apikey = settings.find(x => x.setting == "plexpy.apikey").value;
                    let url = `http://${host}${baseurl}/api/v2?apikey=${apikey}&cmd=get_user_watch_time_stats&user_id=${userId}`;
                    request(url, function (e, r, b) {
                        let j = JSON.parse(b);
                        if (e && r.statusCode !== 200) reject(e);
                        resolve(JSON.stringify(j.response));
                    });
                }
            );
        });
    return p;
}