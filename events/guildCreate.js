const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./settings.sqlite');

module.exports = (guild, client) => {
    // We have joined a new discord server, we need to populate and prepare for configuration.
    // Looking at a db backend, possibly sqlite to hold the "server configurations"
    const guildId = guild.id;
    db.serialize(() => 
    {
        db.run(`INSERT INTO guildSettings("guildId", "setting")
            VALUES(guildId, "plexpy.host"),
                (guildId, "plexpy.baseurl"),
                (guildId, "plexpy.apikey"),
                (guildId, "sonarr.host"),
                (guildId, "sonarr.baseurl"),
                (guildId, "sonarr.apikey"),
                (guildId, "radarr.host"),
                (guildId, "radarr.baseurl"),
                (guildId, "radarr.apikey"),
                (guildId, "lidarr.host"),
                (guildId, "lidarr.baseurl"),
                (guildId, "lidarr.apikey"),
                (guildId, "tmdb.apikey"),
                (guildId, "tvdb.apikey"),
                (guildId, "self.adminChannel"),
                (guildId, "self.adminRole"),
                (guildId, "self.modRole")
        `);
    });
    db.close();
    guild.owner.send("Hello, I am ${client.user.username} your personal Media Butler!\nTo get going we are going to need to set a few settings, please look at the set command and our github wiki to get going");
};