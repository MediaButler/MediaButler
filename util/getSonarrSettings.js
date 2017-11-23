const getSettings = require('./getSettings');
module.exports = (guildId) =>
{
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
            {
                settings = JSON.parse(settings);
                let url = settings.find(x => x.setting == "sonarr.url");
                let apikey = settings.find(x => x.setting == "sonarr.apikey");
                const regex = /^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{4})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$/g;
                let details = regex.exec(url.value);
                if (url.value == null || apikey.value == null || url == undefined || apikey == undefined) reject("Sonarr not configured");
                let i = {};
                i.protocol = details[1];
                i.host = details[2];
                i.port = 443;
                if (details[3] !== undefined) i.port = details[3];
                i.path = details[6];
                i.apikey = apikey.value;
                console.log(i);
                resolve(i);
            }
        );
    });
    return p;
}