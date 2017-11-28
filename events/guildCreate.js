const sqlite3 = require('sqlite3').verbose();
const uuid = require('uuid-v4');
module.exports = (guild) => {
    let db = new sqlite3.Database('./settings.sqlite');
    let myUuid = uuid();
    db.serialize(() => {
        db.run(`INSERT INTO guildSettings(guildId, setting, value)
            VALUES(${guild.id}, "plexpy.url", NULL),
                (${guild.id}, "plexpy.apikey", NULL),
                (${guild.id}, "sonarr.url", NULL),
                (${guild.id}, "sonarr.apikey", NULL),
                (${guild.id}, "sonarr.defaultprofileid", NULL),
                (${guild.id}, "sonarr.defaultrootpath", NULL),
                (${guild.id}, "radarr.url", NULL),
                (${guild.id}, "radarr.apikey", NULL),
                (${guild.id}, "radarr.defaultprofileid", NULL),
                (${guild.id}, "radarr.defaultrootpath", NULL),                
                (${guild.id}, "lidarr.url", NULL),
                (${guild.id}, "lidarr.apikey", NULL),
                (${guild.id}, "tmdb.apikey", NULL),
                (${guild.id}, "tvdb.apikey", NULL),
                (${guild.id}, "omdb.apikey", "5af02350"),    
                (${guild.id}, "self.uuidv4", "${myUuid}"),
                (${guild.id}, "self.adminChannel", NULL),
                (${guild.id}, "self.adminRole", NULL),
                (${guild.id}, "self.modRole", NULL)
        `);
    });
    db.close();
    guild.owner.send(`Hello, I am ${guild.client.user.username} your personal Media Butler!\nTo get going we are going to need to set a few settings, please look at the set command and our github wiki to get going`);
};