const Discord = require('discord.js');
const createNowPlayingTVModal = require('./createNowPlayingTVModal');
const createNowPlayingMovieModal = require('./createNowPlayingMovieModal');
const createNowPlayingDefaultModal = require('./createNowPlayingDefaultModal');

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
		i = createNowPlayingDefaultModal(guild, nowPlayingItem.NowPlayingItem);
    	i.setAuthor(nowPlayingItem.UserName + ' is streaming:', '', '');
	}
	return i;
};