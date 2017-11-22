const request = require('request');
const getUserId = require('../util/getUserIdFromUsernamePlexpy');
const getUserStats = require('../util/getUserStatsFromPlexpy');
const createUserStats = require('../util/createUserStatsModal');
exports.run = (bot, msg, args, perms = []) => {
  if (!args[0]) {
    msg.channel.send("ERR: No username set");
    return;
  }
  msg.channel.send("Starting...")
  .then(m => {
    msg.channel.startTyping();
    m.edit("Querying PlexPy for UserID");
    getUserId(msg.guild.id, args[0])
    .then(userId => {
      m.edit(`Got UserID ${userId}. Querying PlexPy for Statistics.`);
      getUserStats(msg.guild.id, userId)
      .then(stats => {
        let e = createUserStats(stats);
        e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
        m.edit({embed: e});
        msg.channel.stopTyping();
      });
    });
  });
};
exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name: "stats",
  description: "Gets watched stats about <user>",
  usage: "stats <user>"
};