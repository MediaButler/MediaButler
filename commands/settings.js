const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./settings.sqlite');
const gs = require('../services/getSettings.js');

exports.run = (client, message, params = [], perms) => {
    if (params[0] === undefined)
    {
        let guildId = message.guild.id;
        gs.getSettings(guildId)
        .then((res) => { console.log(res); });

        return;
    }
    let setting = params[0];
    let value = params[1];
    let guildId = message.guild.id;
    let query = `UPDATE guildSettings SET "value" = ? WHERE "guildId" = ? AND "setting" = ?`
    let queryData = [value, guildId, setting];
    db.run(query, queryData, function(err) {
        if (err) {
            message.channel.send("Unable to update: " + err.message);
          return;
        }
        message.channel.send("Sucessfully Updated");
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['set', 'settings', 'setconfig'],
    permLevel: 4
};

exports.help = {
    name: 'settings',
    description: 'Allows you to read/set a configuration.',
    usage: 'set <config> <value>'
};