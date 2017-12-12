const createTvShowItemModal = require('../../util/sonarr/createTvShowModal');
const getTvShowInfo = require('../../util/omdb/getTvShow');
exports.run = (bot, msg, args = []) => {
  getTvShowInfo(args)
    .then((tvShow) => {
      const e = createTvShowItemModal(tvShow);
      e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
      msg.channel.send({ 'embed': e });
    });
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};
exports.help = {
  name: 'search',
  description: 'Pulls info for series or anime.',
  usage: 'tv <show>'
};