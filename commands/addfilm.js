const getQualityProfile = require('../util/getQualityProfileIdFromRadarr');
const getMovie = require('../util/getMovieFromRadarr');
const addMovie = require('../util/addMovieToRadarr');
const createMovietem = require('../util/createMovieItemFromRadarr');
const createMovieItemModal = require('../util/createMovieItemModal');
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
      addMovie(msg.guild.id, movie, pid, rp)
      .then((movieAdded) => {
        m.edit("Movie added sucessfully");
        let l = createMovieItem(movie);
        let e = createMovieItemModal(l);
        e.setAuthor("Movie added sucessfully");
        e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);        
        m.edit({ embed: e });
        msg.channel.stopTyping();
      }).catch((e) => { m.edit(`ERR: ${e}`); msg.channel.stopTyping(); return; });
    }).catch((e) => { m.edit(`ERR: ${e}`); msg.channel.stopTyping(); return; });
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