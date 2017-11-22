const getSettings = require('./getSettings');
const request = require('request');
module.exports = (guildId, username) => 
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
                    let url = `http://${host}${baseurl}/api/v2?apikey=${apikey}&cmd=get_users`;
                    request(url, function (e, r, b) {
                    let j = JSON.parse(b);
                    let u = j.response.data.find(o => o.username === username);
                    if (u === undefined) {
                        reject("Unable to match user");
                    }
                    resolve(u.user_id);
                    });
                }
            );
        });
    return p;
}