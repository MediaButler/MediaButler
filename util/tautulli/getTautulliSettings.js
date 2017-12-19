const getSettings = require('../getSettings');
module.exports = (guildId) =>
{
  const p = new Promise((resolve, reject) => 
  {
    getSettings(guildId)
      .then((settings) =>
      {
        settings = JSON.parse(settings);
        const url = settings.find(x => x.setting == 'tautulli.url');
        const apikey = settings.find(x => x.setting == 'tautulli.apikey');
        const regex = /^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{4})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$/g;
        const details = regex.exec(url.value);
        if (url.value == null || apikey.value == null) reject('Tautulli not configured');
        const i = {};
        i.protocol = details[1];
        i.host = details[2];
        if (details[3] !== undefined) i.host = i.host + `:${details[3]}`;
        i.path = details[6];
        i.apikey = apikey.value;
        resolve(i);
      });
  });
  return p;
};