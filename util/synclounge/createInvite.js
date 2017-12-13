const getSettings = require('./getPlexTogetherSettings');
const axios = require('axios');
module.exports = (guildId) => {
  const p = new Promise((resolve, reject) => 
  {
    getSettings(guildId)
      .then((settings) =>
      {
        if (!settings.webappurl.value || !settings.serverurl.value) return reject('SyncLounge not configured');
        const webappurl = settings.webappurl.value;
        const serverurl = settings.serverurl.value;
        axios.post(webappurl + '/invite', {
          ptroom: (0|Math.random()*9e6).toString(36) + (0|Math.random()*9e6).toString(36),
          ptpassword: (0|Math.random()*9e6).toString(36),
          ptserver: serverurl,
          owner: 'MediaButler'
        })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      }).catch((e) => { reject(e); });
  });
  return p;
};