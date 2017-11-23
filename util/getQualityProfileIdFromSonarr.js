const getQualityProfiles = require('./getQualityProfilesFromSonarr');
module.exports = (guildId, quality) => {
    const p = new Promise((resolve, reject) => 
    {
        getQualityProfiles(guildId)
        .then((profiles) => {
            let profile = result.find(q => q.name === quality);
            if (profile === undefined) reject("Profile not found");
            resolve(profile.id);
        }).catch((e) => { reject(e); });
    });
};