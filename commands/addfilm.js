const getQualityProfile = require('../util/getQualityProfileIdFromRadarr');
const getMovie = require('../util/getTvShowFromRadarr');
const addMovie = require('../util/addMovieToRadarr');
const createMovietem = require('../util/createTvShowItemFromRadarr');
const createMovietemModal = require('../util/createTvShowItemModal');
exports.run = (client, msg, args, perms) => {
  msg.channel.send("Starting...")
  .then((m) => {
    msg.channel.startTyping();
    let rp = null;
    let pid = null;
    if (args[1]) {
      m.edit("Detected Quality Profile override. Querying Radarr for profileId");
      getQualityProfile(msg.guild.id, args[1])
      .then((profileId) => {
        pid = profileId;
        m.edit("Received profileId. Continuing");
      });
    }
    if (args[2]) {
      m.edit("Detected rootPath override");
      rp = args[2];
    }
    m.edit("Querying Radarr for Movie information");
    getMovie(msg.guild.id, args[0])
    .then((movie) => {
      m.edit("Received Movie infromation. Adding to Radarr.");
      addTvShow(msg.guild.id, tvShow, pid, rp)
      .then((movieAdded) => {
        m.edit("Movie added sucessfully");
        let l = createMovieItem(movie);
        let e = createMovieItemModal(l);
        e.setAuthor("Movie added sucessfully");
        e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);        
        m.edit({ embed: e });
        msg.channel.stopTyping();
      });
    }).catch((e) => { m.edit(`ERR: ${e}`); return; });
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'addfilm',
  description: 'Adds a Movie directly to Radarr',
  usage: 'addtv <imdbId> [qualityProfile] [rootPath]'
};