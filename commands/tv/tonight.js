const getTonight = require('../../util/sonarr/getTonight');
const createTonightItem = require('../../util/sonarr/createTonightModal');
exports.run = (bot, msg, args = []) => {
  msg.channel.send('Starting...')
    .then((m) => {
      msg.channel.startTyping();
      m.edit('Querying Tonight from Sonarr');
      getTonight(msg.guild)
        .then((tonight) => { 
          if (tonight.length == 0) { 
            m.edit('Nothing is airing tonight :frowning:');
            msg.channel.stopTyping();
            return;
          }
          m.edit('Airing tonight:');
          tonight.forEach(t => {
            const e = createTonightItem(t);
            msg.channel.send({ embed: e });
          });
          msg.channel.stopTyping();
        }).catch((e) => { m.edit(`ERR: ${e}`); msg.channel.stopTyping(); });
    });
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name: 'tonight',
  description: 'Whats on TV tonight?',
  usage: 'tv tonight'
};
