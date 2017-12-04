const sqlite3 = require('sqlite3').verbose();
const coreSettings = require(`${process.cwd()}/settings.json`);

module.exports = (guild) => {
    // We have joined a new discord server, we need to populate and prepare for configuration.
    // Looking at a db backend, possibly sqlite to hold the "server configurations"
    const guildId = guild.id;
    let db = new sqlite3.Database(`${process.cwd()}${coreSettings["path"]}/settings.sqlite`);    
    db.serialize(() => 
    {
        db.run(`DELETE FROM guildSettings WHERE guildId = ${guildId}`);
    });
    db.close();
};