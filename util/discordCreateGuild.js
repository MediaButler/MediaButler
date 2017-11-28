const sqlite3 = require('sqlite3').verbose();
const uuid = require('uuid-v4');
module.exports = (guildId) => 
{
    const p = new Promise((resolve, reject) => 
    {
        let db = new sqlite3.Database('./settings.sqlite');
        let myUuid = uuid();
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
                if (row === 0) reject("Unable to update database");
                resolve();
            });
        });
        db.close();
    });
    return p;
}
