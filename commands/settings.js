const sqlite3 = require('sqlite3').verbose();
const gs = require('../util/getSettings');
const coreSettings = require(`${process.cwd()}/settings.json`);

exports.run = (client, message, params = [], perms) => {
  const db = new sqlite3.Database(`${coreSettings['path']}/settings.sqlite`);    
  if (params[0] === undefined)
  {
    const guildId = message.guild.id;
    gs(guildId)
      .then((res) => { console.log(res); });
    return;
  }

  const setting = params[0];
  const value = params[1];
  const guildId = message.guild.id;
  const query = 'UPDATE guildSettings SET "value" = ? WHERE "guildId" = ? AND "setting" = ?';
  const queryData = [value, guildId, setting];
  db.run(query, queryData, function(err) {
    if (err) {
      message.channel.send('Unable to update: ' + err.message);
      return;
    }
    message.channel.send('Sucessfully Updated');
  });
  db.close();
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