const getSettings = require('./getSettings');
module.exports = (guildId) =>
{
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
        {
            settings = JSON.parse(settings);
            let url = settings.find(x => x.setting == "plex.url");
            let token = settings.find(x => x.setting == "plex.token");
            let pinToken = settings.find(x => x.setting == "plex.pintoken");
            const regex = /^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{4})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$/g;
            let details = regex.exec(url.value);
            if (url.value == null) reject("Plex not configured");
            let i = {};
            i.host = url.value;
            i.token = token.value;
            i.pinToken = JSON.parse(pinToken.value.replace(/\\"/g, '"'));
            resolve(i);
        });
    });
    return p;
}