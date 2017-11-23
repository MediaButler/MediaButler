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
                let apikey = settings.find(x => x.setting == "plexpy.apikey").value;
                let s = {};
                let regex = new RegExp('^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{4})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$');
                let details = url.match(regex);
                if (url == null || apikey == null) reject("plexpy settings not set");
                console.log(details);
                resolve(details);
            }
        );
    });
}