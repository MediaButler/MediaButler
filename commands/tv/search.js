const createTvShowItemModal = require('../../util/discord/createTvShowModal');
const getTvShowInfo = require('../../util/omdb/getTvShow');
const getTvdbIdByImdbId = require('../../util/thetvdb/getTvdbIdByImdbId');
exports.run = (bot, msg, args = []) => {
  getTvShowInfo(args)
    .then((tvShow) => {
      getTvdbIdByImdbId(msg.guild, tvShow.imdbID)
        .then((res) => {
          tvShow.tvdbID = res;          
          const e = createTvShowItemModal(tvShow);    
          e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
          msg.channel.send({ 'embed': e });      
        });
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