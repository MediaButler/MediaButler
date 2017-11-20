const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./settings.sqlite');
module.exports = (guild, client) => {
    db.serialize(() => {
        db.run(`INSERT INTO guildSettings(guildId, setting)
            VALUES(${guild.id}, "plexpy.host"),
                (${guild.id}, "plexpy.baseurl"),
                (${guild.id}, "plexpy.apikey"),
                (${guild.id}, "sonarr.host"),
                (${guild.id}, "sonarr.baseurl"),
                (${guild.id}, "sonarr.apikey"),
                (${guild.id}, "sonarr.defaultprofileid"),
                (${guild.id}, "sonarr.defaultrootpath"),
                (${guild.id}, "radarr.host"),
                (${guild.id}, "radarr.baseurl"),
                (${guild.id}, "radarr.apikey"),
                (${guild.id}, "radarr.defaultprofileid"),
                (${guild.id}, "radarr.defaultrootpath"),                
                (${guild.id}, "lidarr.host"),
                (${guild.id}, "lidarr.baseurl"),
                (${guild.id}, "lidarr.apikey"),
                (${guild.id}, "tmdb.apikey"),
                (${guild.id}, "tvdb.apikey"),
                (${guild.id}, "self.adminChannel"),
                (${guild.id}, "self.adminRole"),
                (${guild.id}, "self.modRole")
        `);
    });
    db.close();
    guild.owner.send(`Hello, I am ${client.user.username} your personal Media Butler!\nTo get going we are going to need to set a few settings, please look at the set command and our github wiki to get going`);
};