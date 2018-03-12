const createTvShowItemModal = require('../../util/discord/createTvShowModal');
const createSeasonItemModal = require('../../util/discord/createSeasonModal');
const createEpisodeItemModal = require('../../util/discord/createEpisodeModal');
const getTvShowInfo = require('../../util/omdb/getTvShow');
const getSeasonInfo = require('../../util/omdb/getSeason');
const getEpisodeInfo = require('../../util/omdb/getEpisode');
const getTvdbIdByImdbId = require('../../util/thetvdb/getTvdbIdByImdbId');
exports.run = (bot, msg, args = []) => {
  	if (typeof args[0] == "undefined" || args[0] === null) {
	    msg.channel.send(
	      `Specify a tv show to search for. \nUsage: ${msg.guild.settings.prefix}${this.help.usage}`
	    );
	} else {
		seasonEpisodeInfo = args.slice(-1)[0];
		var regexSeason = /[Ss]?0*(\d+)$/
		var resultSeason = (!seasonEpisodeInfo) ? null : seasonEpisodeInfo.match(regexSeason);
		var regexEpisode = /[Ss]?0*(\d+)?[xEe]0*(\d+)/
		var resultEpisode = (!seasonEpisodeInfo) ? null : seasonEpisodeInfo.match(regexEpisode);
		if(resultEpisode){
			var season = resultEpisode[1];
			var episode = resultEpisode[2];
			getEpisodeInfo(args.slice(0,-1), season, episode).then((episodeItem) => {
				const e = createEpisodeItemModal(episodeItem);    
				e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
				msg.channel.send({ 'embed': e });    
			});
		} else if (resultSeason) {
			var season = resultSeason[1];
			getSeasonInfo(args.slice(0,-1), season).then((seasonItem) => {
				const e = createSeasonItemModal(seasonItem);    
				e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
				msg.channel.send({ 'embed': e });    
			});
		} else {
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
		}
	}
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};
exports.help = {
  name: 'search',
  description: 'Pulls info for series or anime with optional season and/or episode number.',
  usage: 'tv <show> [season and/or episode number]'
};