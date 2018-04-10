const getApiUser = require('../../util/plex/getApiUser');
const getUser = require('../../util/db/getUser');
const searchMusic = require('../../util/plex/searchMusic');
const playQueue = require('../../util/music/playQueue');
exports.run = (bot, msg, args = []) => {
  if (!args[0]) { msg.channel.send('Please put a query'); return; }
  if (!msg.member.voiceChannel) { msg.channel.send('Please join a voice channel'); return; }

  getUser(msg.member).then((settings) => {
    msg.member.settings = settings;
    getApiUser(msg.member).then((d) => {
      if (msg.member.mediaSearch) {
        if (!args.toString().startsWith('id:')) { msg.member.mediaSearch = null; }
        else {
          args[0] = args[0].split(':')[1] - 1;
          const plexurl = settings.plex.url.toString().slice(0, -1);
          const url = `${plexurl}${msg.member.mediaSearch.Metadata[args].Media[0].Part[0].key}?X-Plex-Token=${settings.plex.token}&X-Plex-Client-Identifier=6ce0a124-842d-4e5c-a5bd-908e7de9082e`;
          let artist;
          if ('originalTitle' in msg.member.mediaSearch.Metadata[args]) artist = msg.member.mediaSearch.Metadata[args].originalTitle;
          else artist = msg.member.mediaSearch.Metadata[args].grandparentTitle;
          const title = msg.member.mediaSearch.Metadata[args].title;
          const album = msg.member.mediaSearch.Metadata[args].parentTitle;
          const duration = msg.member.mediaSearch.Metadata[args].duration.toString();
          const image = `${plexurl}${msg.member.mediaSearch.Metadata[args].thumb}?X-Plex-Token=${settings.plex.token}&X-Plex-Client-Identifier=6ce0a124-842d-4e5c-a5bd-908e7de9082e`;
          msg.guild.mediaQueue.push({artist, title, url, album, duration, image});
          if (msg.guild.mediaQueue.length > 1) msg.channel.send(`Added ${artist} - ${title} to the queue`);
          if (!msg.guild.isPlaying) playQueue(msg);
          msg.member.mediaSearch = null;
          return;
        }
      }
      searchMusic(d, encodeURI(args.join(' ')), 0).then((res) => {
        switch (res.size) {
          case 0:
            msg.channel.send('No results found');
            break;
          case 1:
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
            break;
          default:
            let results = '\n';
            msg.member.mediaSearch = res;
            for (var t = 0; t < res.Metadata.length; t++) {
              let artist;
              if ('originalTitle' in res.Metadata[t]) artist = res.Metadata[t].originalTitle;
              else artist = res.Metadata[t].grandparentTitle;
              results += (t+1) + ' - ' + artist + ' - ' + res.Metadata[t].title + '\n';
            }
            msg.channel.send(`\`\`\`${results}\nPlease select which track you would like with '!music add id:<id>'\`\`\``);
            break;
        }
      });
    });
  });
};
exports.help = {
  name: 'add',
  description: 'add',
  usage: 'music add [query]'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};