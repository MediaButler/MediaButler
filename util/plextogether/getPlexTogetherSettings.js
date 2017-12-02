const getSettings = require('../getSettings');
module.exports = (guildId) =>
{
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
        {
            settings = JSON.parse(settings);
            let webappurl = settings.find(x => x.setting == "plextogether.webappurl");
            let serverurl = settings.find(x => x.setting == "plextogether.serverurl");               
            if (!webappurl || !serverurl) reject("PlexTogether not configured");                      
            let i = { webappurl, serverurl };            
            resolve(i);
        }).catch((e) => { reject(e); });
    });
    return p;
}