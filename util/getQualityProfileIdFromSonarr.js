const getQualityProfiles = require('./getQualityProfilesFromSonarr');
module.exports = (quality) => {
    const p = new Promise(
        function (resolve, reject) {
            getQualityProfiles()
            .then((profiles) => {
            let profile = result.find(q => q.name === quality);
            if (profile === undefined) reject("Profile not found");
            resolve(profile.id);
        });
    });
};