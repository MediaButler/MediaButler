const getApi = require('./getApi');
module.exports = (guild) => {
  const p = new Promise((resolve, reject) => 
  {
    getApi(guild)
      .then((sonarr) =>
      {
        const today = new Date();
        const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
        today.setUTCHours(20);
        tomorrow.setUTCHours(06);
        sonarr.get('calendar', { 'start': today.toISOString(), 'end': tomorrow.toISOString()})
          .then((result) => {
            resolve(result);
          });
      }).catch((e) => { reject(e); });
  });
  return p;
};