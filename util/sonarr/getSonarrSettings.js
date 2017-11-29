const getSettings = require('../getSettings');
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
            let profileid = settings.find(x => x.setting == "sonarr.defaultprofileid");
            let rootpath = settings.find(x => x.setting == "sonarr.defaultrootpath");                
            const regex = /^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{4})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$/g;
            if (url == undefined || apikey == undefined || profileid == undefined || rootpath == undefined) reject("Sonarr not configured");
            if (url.value == null || apikey.value == null || profileid.value == null || rootpath.value == null) reject("Sonarr not configured");    
            let details = regex.exec(url.value);                
            let i = {};
            i.protocol = details[1];
            i.host = details[2];
            i.port = 443;
            if (i.protocol == "http") i.port = 80;            
            if (details[3] !== undefined) i.port = details[3];
            i.path = details[6];
            i.apikey = apikey.value;
            i.profileId = profileid.value;
            i.rootPath = rootpath.value;
            resolve(i);
        }).catch((e) => { reject(e); });
    });
    return p;
}