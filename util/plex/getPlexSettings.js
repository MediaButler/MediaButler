const getSettings = require('../getSettings');
module.exports = (guildId) =>
{
  const p = new Promise((resolve, reject) => 
  {
    getSettings(guildId)
      .then((settings) =>
      {
        settings = JSON.parse(settings);
        const url = settings.find(x => x.setting == 'plex.url');
        const token = settings.find(x => x.setting == 'plex.token');
        const pinToken = settings.find(x => x.setting == 'plex.pintoken');
        const uuid = settings.find(x => x.setting == 'self.uuidv4');
        const regex = /^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{5})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$/g;
        if (uuid == undefined) reject('UUID not configured, please delete and re-invite this bot');
        const details = regex.exec(url.value);
        if (url.value == null) reject('Plex not configured');
        const i = {};
        i.protocol = details[1];
        i.host = details[2];
        i.port = 443;
        if (i.protocol == 'http') i.port = 80;
        if (details[3] !== undefined) i.port = details[3];
        i.token = token.value;
        i.pinToken = null;
        i.uuid = uuid.value;
        if (pinToken.value != null) i.pinToken = JSON.parse(pinToken.value.replace(/\\"/g, '"'));
        resolve(i);
      });
  });
  return p;
};