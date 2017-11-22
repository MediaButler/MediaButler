const getTonight = require('../util/getTonightFromSonarr');
const createTonightItem = require('../util/createTonightItemModal');
exports.run = (bot, msg, params = []) => {
  msg.channel.send("Starting...")
  .then((m) => {
      msg.channel.startTyping();
      m.edit("Querying Tonight from Sonarr");
      getTonight(msg.guild.id)
      .then((tonight) => { 
        m.edit("Airing tonight:");
        tonight.forEach(t => {
          let e = createTonightItem(t);
          msg.channel.send({ embed: e });
        });
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
  name: "tonight",
  description: "Whats on TV tonight?",
  usage: "tonight"
};
