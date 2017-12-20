const saveDb = require('../db/saveDb');
module.exports = (guild, url) => {
  return new Promise((resolve) => {
    guild.settings.plex.url = url;
    saveDb(guild.client);
    resolve();
  });
};