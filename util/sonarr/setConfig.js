const sqlite3 = require('sqlite3').verbose();
const gs = require('../getSettings');
const coreSettings = require(`${process.cwd()}/settings.json`);
module.exports = (guildId, url, apikey, defaultProfile, defaultRoot) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(`${coreSettings['path']}/settings.sqlite`);
    const query = 'UPDATE guildSettings SET "value" = ? WHERE "guildId" = ? AND "setting" = ?';
    const queryData = [];
    queryData.push([url, guildId, 'sonarr.url']);
    queryData.push([apikey, guildId, 'sonarr.apikey']);
    queryData.push([defaultProfile, guildId, 'sonarr.defaultprofileid']);
    queryData.push([defaultRoot, guildId, 'sonarr.defaultrootpath']);
    let errorMessage;
    queryData.forEach((q) => {
      db.run(query, q, function(err) {
        if (err) { errorMessage = err; }
      });
    });
    if (errorMessage != null) reject(errorMessage);
    resolve();
    db.close();
  });
};