const createMovieItemModal = require('../util/createMovieItemModal');
const getMovieInfo = require('../util/getMovieInfoFromOmdb');
exports.run = (bot, msg, args = []) => {
  getMovieInfo(args)
  .then((movieInfo) => {
    let e = createMovieItemModal(movieInfo);
    e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
    msg.channel.send({ "embed": e });
  });
};
exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['movie'],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name: "film",
  description: "Pulls info for a film",
  usage: "film <movie name>"
};