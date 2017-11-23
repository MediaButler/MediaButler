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
                const regex = /^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{4})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$/g;
                console.log(url);
                let details = regex.match(url);
                if (url == null || apikey == null) reject("plexpy settings not set");
                console.log(details);
                resolve(details);
            }
        );
    });
}