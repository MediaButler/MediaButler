module.exports = (message, trackList, ) => {
  const settings = msg.member.settings;
  const plexurl = settings.plex.url.toString().slice(0, -1);
  const url = `${plexurl}${res.Metadata[0].Media[0].Part[0].key}?X-Plex-Token=${settings.plex.token}&X-Plex-Client-Identifier=6ce0a124-842d-4e5c-a5bd-908e7de9082e`;
  let artist;
  if ('originalTitle' in res.Metadata[0]) artist = res.Metadata[0].originalTitle;
  else artist = res.Metadata[0].grandparentTitle;
  const title = res.Metadata[0].title;
  const album = res.Metadata[0].parentTitle;
  const duration = res.Metadata[0].duration.toString();
  const image = `${plexurl}${res.Metadata[0].thumb}?X-Plex-Token=${settings.plex.token}&X-Plex-Client-Identifier=6ce0a124-842d-4e5c-a5bd-908e7de9082e`;
  msg.guild.mediaQueue.push({artist, title, url, album, duration, image});
  if (msg.guild.mediaQueue.length > 1) msg.channel.send(`Added ${artist} - ${title} to the queue`);
  if (!msg.guild.isPlaying) playQueue(msg);
};