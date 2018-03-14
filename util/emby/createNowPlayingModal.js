const Discord = require('discord.js');

    function leadingZero(n) {
	    return (n < 10) ? ("0" + n) : n;
	}

module.exports = (guild, nowPlayingItem) => {
  	var i;
  	if (nowPlayingItem.NowPlayingItem.Type === 'Episode') {
    	i = new Discord.RichEmbed().setTitle(`${nowPlayingItem.NowPlayingItem.SeriesName} - S${leadingZero(nowPlayingItem.NowPlayingItem.ParentIndexNumber)}E${leadingZero(nowPlayingItem.NowPlayingItem.IndexNumber)} - ${nowPlayingItem.NowPlayingItem.Name}`)
  	} else {
  		i = new Discord.RichEmbed().setTitle(nowPlayingItem.NowPlayingItem.Name)
  	}

    if (nowPlayingItem.NowPlayingItem.Type === 'Audio') {
        i = new Discord.RichEmbed().setTitle(nowPlayingItem.NowPlayingItem.Name )
        var artists = "";
        nowPlayingItem.NowPlayingItem.Artists.forEach(a => { 
            artists += ", " + a;
          });
        i.setDescription(artists.substring(2))
        .addField('Audio Decision', `${nowPlayingItem.NowPlayingItem.MediaStreams[0].DisplayTitle}`, true);
    } else {
        videoCodec = (typeof nowPlayingItem.NowPlayingItem.TranscodingInfo !== "undefined") ? nowPlayingItem.NowPlayingItem.TranscodingInfo.VideoCodec : nowPlayingItem.NowPlayingItem.MediaStreams[0].DisplayTitle;
        audioCodec = (typeof nowPlayingItem.NowPlayingItem.TranscodingInfo !== "undefined") ? nowPlayingItem.NowPlayingItem.TranscodingInfo.AudioCodec : nowPlayingItem.NowPlayingItem.MediaStreams[nowPlayingItem.PlayState.AudioStreamIndex].DisplayTitle;
        width = (typeof nowPlayingItem.NowPlayingItem.TranscodingInfo !== "undefined") ? nowPlayingItem.NowPlayingItem.TranscodingInfo.Width : nowPlayingItem.NowPlayingItem.MediaStreams[0].Width;
        height = (typeof nowPlayingItem.NowPlayingItem.TranscodingInfo !== "undefined") ? nowPlayingItem.NowPlayingItem.TranscodingInfo.Height : nowPlayingItem.NowPlayingItem.MediaStreams[0].Height;
        i.addField('Stream Resolution', `${width}x${height}`, true)
        .addField('Video/Audio Decision', `${videoCodec}/${audioCodec}`, true)
        .setDescription(nowPlayingItem.NowPlayingItem.Overview)
        .addField('Play Method', `${nowPlayingItem.PlayState.PlayMethod}`, true);
    }
    state = nowPlayingItem.PlayState.IsPaused ? "Paused" : "Playing";


    i.setAuthor(nowPlayingItem.UserName + ' is streaming:', '', '')
    .setColor(5420363)
    .setThumbnail(guild.settings.emby.external_url + "/Items/" + nowPlayingItem.NowPlayingItem.Id + "/Images/Primary")
    .setTimestamp()
    .addField(`Stream Info`, nowPlayingItem.Id, true)
    .addField('Player', nowPlayingItem.Client, true)
    .addField('Current State', state, true);

	return i;
};