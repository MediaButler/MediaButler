const getUserId = require('../../util/tautulli/getUserId');
const getUserStats = require('../../util/tautulli/getUserStats');
const createUserStats = require('../../util/discord/createUserStatsModal');
exports.run = (bot, msg, args, perms = []) => {
  if (!args[0]) {
    msg.channel.send('ERR: No username set');
    return;
  }
  msg.channel.send('Starting...')
    .then(m => {
      msg.channel.startTyping();
      m.edit('Querying Tautulli for UserID');
      getUserId(msg.guild, args[0])
        .then(userId => {
          m.edit(`Got UserID ${userId}. Querying Tautulli for Statistics.`);
          getUserStats(msg.guild, userId)
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
  name: 'user',
  description: 'Gets watched stats about <user>',
  usage: 'stats user <user>'
};