const createMovieItemModal = require('../../util/discord/createMovieModal');
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
  description: 'Searches for a film',
  usage: 'movie <filmName>'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};