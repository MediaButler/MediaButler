const getQualityProfile = require('../util/sonarr/getQualityProfileId');
const getTvShow = require('../util/sonarr/getTvShow');
const addTvShow = require('../util/sonarr/addTvShow');
const createTvShowItem = require('../util/sonarr/createTvShowModalSonarr');
const createTvShowItemModal = require('../util/sonarr/createTvShowModal');
exports.run = (client, msg, args) => {
  msg.channel.send("Starting...")
  .then((m) => {
    msg.channel.startTyping();
    let rp = null;
    let pid = null;
    if (args[1]) {
      m.edit("Detected Quality Profile override. Querying Sonarr for profileId");
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
    m.edit("Querying Sonarr for TV Show information");
    getTvShow(msg.guild.id, args[0])
    .then((tvShow) => {
      m.edit("Received TV Show infromation. Adding to Sonarr.");
      addTvShow(msg.guild.id, tvShow, pid, rp)
      .then(() => {
        m.edit("Show added sucessfully");
        let l = createTvShowItem(tvShow);
        let e = createTvShowItemModal(l);
        e.setAuthor("TV Show added sucessfully");
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
  name: 'addtv',
  description: 'Adds a TV Show directly to Sonarr',
  usage: 'addtv <tvdbId> [qualityProfile] [rootPath]'
};