const Discord = require('discord.js');
const createNowPlayingTVModal = require('./createNowPlayingTVModal');
const createNowPlayingMovieModal = require('./createNowPlayingMovieModal');

module.exports = (guild, nowPlayingItem) => {
  	var i;
	if (nowPlayingItem.NowPlayingItem.Type === 'Episode') {
		i = createNowPlayingTVModal(guild, nowPlayingItem.NowPlayingItem);
    	i.setAuthor(nowPlayingItem.UserName + ' is watching:', '', '');
	}
	else if (nowPlayingItem.NowPlayingItem.Type === 'Movie') {
		i = createNowPlayingMovieModal(guild, nowPlayingItem.NowPlayingItem);
    	i.setAuthor(nowPlayingItem.UserName + ' is watching:', '', '');
	}
	else{

	}
	return i;
};