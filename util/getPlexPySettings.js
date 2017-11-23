const getSettings = require('./getSettings');
module.exports = (guildId) =>
{
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
            {
                settings = JSON.parse(settings);
                let url = settings.find(x => x.setting == "plexpy.url");
                let apikey = settings.find(x => x.setting == "plexpy.apikey");
                const regex = /^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{4})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$/g;
                let details = regex.exec(url.value);
                if (url === undefined || apikey === undefined) reject("plexpy settings not set");
                let i = {};
                i.protocol = details[1];
                i.host = details[2];
                if (details[3] !== undefined) i.host = i.host + `:${details[3]}`;
                i.path = details[6];
                i.apikey = apikey.value;
                resolve(i);
            }
        );
    });
    return p;
}