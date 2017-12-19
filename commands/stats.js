const getUserId = require('../util/tautulli/getUserId');
const getUserStats = require('../util/tautulli/getUserStats');
const createUserStats = require('../util/tautulli/createUserStatsModal');
exports.run = (bot, msg, args, perms = []) => {
  if (!args[0]) {
    msg.channel.send('ERR: No username set');
    return;
  }
  msg.channel.send('Starting...')
    .then(m => {
      msg.channel.startTyping();
      m.edit('Querying PlexPy for UserID');
      getUserId(msg.guild.id, args[0])
        .then(userId => {
          m.edit(`Got UserID ${userId}. Querying PlexPy for Statistics.`);
          getUserStats(msg.guild.id, userId)
            .then((stats) => {
              m.edit('Received statistics. Building output...');
              const e = createUserStats(stats);
              e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
              m.edit({ embed: e });
              msg.channel.stopTyping();
            });
        }).catch(e => { m.edit(`ERR: ${e}`); msg.channel.stopTyping(); });
    });
};
exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name: 'stats',
  description: 'Gets watched stats about <user>',
  usage: 'stats <user>'
};