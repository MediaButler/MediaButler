const createMovieItemModal = require('../../util/radarr/createMovieModal');
const getMovieInfo = require('../../util/omdb/getMovie');
exports.run = (bot, msg, args = []) => {
  getMovieInfo(args)
    .then((movieInfo) => {
      const e = createMovieItemModal(movieInfo);
      e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
      msg.channel.send({ 'embed': e });
    }).catch((err) => { msg.channel.send(`ERR: ${err}`); });
};
exports.help = {
  name: 'search',
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};