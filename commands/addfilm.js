const getQualityProfile = require('../util/radarr/getQualityProfileId');
const getMovie = require('../util/radarr/getMovie');
const addMovie = require('../util/radarr/addMovie');
const createMovieItem = require('../util/radarr/createMovieModalRadarr');
const createMovieItemModal = require('../util/radarr/createMovieModal');
exports.run = (client, msg, args) => {
  msg.channel.send('Starting...')
    .then((m) => {
      msg.channel.startTyping();
      let rp = null;
      let pid = null;
      if (args[1]) {
        m.edit('Detected Quality Profile override. Querying Radarr for profileId');
        getQualityProfile(msg.guild.id, args[1])
          .then((profileId) => {
            pid = profileId;
            m.edit('Received profileId. Continuing');
          });
      }
      if (args[2]) {
        m.edit('Detected rootPath override');
        rp = args[2];
      }
      m.edit('Querying Radarr for Movie information');
      getMovie(msg.guild.id, args[0])
        .then((movie) => {
          m.edit('Received Movie infromation. Adding to Radarr.');
          addMovie(msg.guild.id, movie, pid, rp)
            .then(() => {
              m.edit('Movie added sucessfully');
              const l = createMovieItem(movie);
              const e = createMovieItemModal(l);
              e.setAuthor('Movie added sucessfully');
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