const playQueue = require('./playQueue');
module.exports = (message, trackList, number) => {
  const settings = message.member.settings;
  const plexurl = settings.plex.url.toString().slice(0, -1);
  switch (number) {
    case 'all':
      for (let i = 0; i < trackList.Metadata.length; i++) {
        const url = `${plexurl}${trackList.Metadata[i].Media[0].Part[0].key}?X-Plex-Token=${settings.plex.token}&X-Plex-Client-Identifier=6ce0a124-842d-4e5c-a5bd-908e7de9082e`;
        let artist;
        if ('originalTitle' in trackList.Metadata[i]) artist = trackList.Metadata[i].originalTitle;
        else artist = trackList.Metadata[i].grandparentTitle;
        const title = trackList.Metadata[i].title;
        const album = trackList.Metadata[i].parentTitle;
        const duration = trackList.Metadata[i].duration.toString();
        const image = `${plexurl}${trackList.Metadata[i].thumb}?X-Plex-Token=${settings.plex.token}&X-Plex-Client-Identifier=6ce0a124-842d-4e5c-a5bd-908e7de9082e`;
        message.guild.mediaQueue.push({artist, title, url, album, duration, image});
      }
      if (message.guild.mediaQueue.length > 1) message.channel.send(`Added playlist of ${trackList.Metadata.length} items to queue`);
      break;
    default:
      number = parseInt(number);
      const url = `${plexurl}${trackList.Metadata[number].Media[0].Part[0].key}?X-Plex-Token=${settings.plex.token}&X-Plex-Client-Identifier=6ce0a124-842d-4e5c-a5bd-908e7de9082e`;
      let artist;
      if ('originalTitle' in trackList.Metadata[number]) artist = trackList.Metadata[number].originalTitle;
      else artist = trackList.Metadata[number].grandparentTitle;
      const title = trackList.Metadata[number].title;
      const album = trackList.Metadata[number].parentTitle;
      const duration = trackList.Metadata[number].duration.toString();
      const image = `${plexurl}${trackList.Metadata[number].thumb}?X-Plex-Token=${settings.plex.token}&X-Plex-Client-Identifier=6ce0a124-842d-4e5c-a5bd-908e7de9082e`;
      message.guild.mediaQueue.push({artist, title, url, album, duration, image});
      if (message.guild.mediaQueue.length > 1) message.channel.send(`Added ${artist} - ${title} to the queue`);
      break;
  }
  if (!message.guild.isPlaying) playQueue(message);
};