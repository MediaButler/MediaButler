const sqlite3 = require('sqlite3').verbose();
const uuid = require('uuid-v4');
const coreSettings = require(`${process.cwd()}/settings.json`);

module.exports = (guildId) => 
{
  const p = new Promise((resolve, reject) => 
  {
    const db = new sqlite3.Database(`${coreSettings['path']}/settings.sqlite`);    
    const myUuid = uuid();
    db.serialize(() => {
      db.run(`INSERT INTO guildSettings(guildId, setting, value)
                VALUES(${guildId}, "plexpy.url", NULL),
                    (${guildId}, "plexpy.apikey", NULL),
                    (${guildId}, "sonarr.url", NULL),
                    (${guildId}, "sonarr.apikey", NULL),
                    (${guildId}, "sonarr.defaultprofileid", NULL),
                    (${guildId}, "sonarr.defaultrootpath", NULL),
                    (${guildId}, "radarr.url", NULL),
                    (${guildId}, "radarr.apikey", NULL),
                    (${guildId}, "radarr.defaultprofileid", NULL),
                    (${guildId}, "radarr.defaultrootpath", NULL),
                    (${guildId}, "plextogether.webappurl", NULL),
                    (${guildId}, "plextogether.serverurl", NULL),
                    (${guildId}, "plex.url", NULL),
                    (${guildId}, "plex.token", NULL),
                    (${guildId}, "plex.pintoken", NULL),
                    (${guildId}, "lidarr.url", NULL),
                    (${guildId}, "lidarr.apikey", NULL),
                    (${guildId}, "tmdb.apikey", NULL),
                    (${guildId}, "tvdb.apikey", NULL),
                    (${guildId}, "omdb.apikey", "5af02350"),    
                    (${guildId}, "self.uuidv4", "${myUuid}"),
                    (${guildId}, "self.adminChannel", NULL),
                    (${guildId}, "self.adminRole", NULL),
                    (${guildId}, "self.modRole", NULL)
            `, (err, rows) => { 
        if (rows === 0) reject('Unable to update database');
        resolve();
      });
    });
    db.close();
  });
  return p;
};
