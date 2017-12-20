const axios = require('axios');
module.exports = (guild) => {
  const p = new Promise((resolve, reject) => 
  {
    const settings = guild.settings.synclounge;
    if (!settings.webappurl || !settings.serverurl) return reject('SyncLounge not configured');
    axios.post(settings.webappurl + '/invite', {
      ptroom: (0|Math.random()*9e6).toString(36) + (0|Math.random()*9e6).toString(36),
      ptpassword: (0|Math.random()*9e6).toString(36),
      ptserver: settings.serverurl,
      owner: 'MediaButler'
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return p;
};