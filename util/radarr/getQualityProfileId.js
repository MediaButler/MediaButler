const getQualityProfiles = require('./getQualityProfiles');
module.exports = (guild, quality = null) => {
  const p = new Promise((resolve, reject) => 
  {
    if (quality == null) quality = guild.settings.radarr.defaultProfile;
    getQualityProfiles(guild)
      .then((profiles) => {
        const profile = profiles.find(q => q.name === quality);
        if (profile === undefined) reject('Profile not found');
        resolve(profile.id);
      }).catch((e) => { reject(e); });
  });
  return p;
};