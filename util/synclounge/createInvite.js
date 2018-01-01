const axios = require('axios');
module.exports = (guild) => {
  const p = new Promise((resolve, reject) => 
  {
    if (!guild.settings.synclounge.appurl || !guild.settings.synclounge.serverurl) return reject('SyncLounge not configured');
    axios.post(guild.settings.synclounge.appurl + '/invite', {
      slroom: (0|Math.random()*9e6).toString(36) + (0|Math.random()*9e6).toString(36),
      slpassword: (0|Math.random()*9e6).toString(36),
      slserver: guild.settings.synclounge.serverurl,
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