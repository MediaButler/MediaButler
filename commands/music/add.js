const getApiUser = require('../../util/plex/getApiUser');
const getUser = require('../../util/db/getUser');
const searchMusic = require('../../util/plex/searchMusic');
const addQueue = require('../../util/music/addQueue');
const getPlaylist = require('../../util/plex/getPlaylist');
const getPlaylists = require('../../util/plex/getPlaylists');
exports.run = (bot, msg, args = []) => {
  let finished = false;
  if (!args[0]) { msg.channel.send('Please put a query'); return; }
  if (!msg.member.voiceChannel) { msg.channel.send('Please join a voice channel'); return; }

  getUser(msg.member).then((settings) => {
    msg.member.settings = settings;
    getApiUser(msg.member).then((d) => {
      if (msg.member.mediaSearch) {
        if (!args.join(' ').toString().startsWith('id:')) { msg.member.mediaSearch = null; }
        else {
          const trackNumber = args[0].split(':')[1] - 1;
          addQueue(msg, msg.member.mediaSearch, trackNumber);
          msg.member.mediaSearch = null;
          finished = true;
          return;
        }
      }
      let offset = 0;
      for (let i = 0; i < args.length; i++) {
        if (args[i].toString().startsWith('offset:')) {
          offset = parseInt(args[i].split(':')[1]);
          args.splice(i, 1);
        }
      }
      if (args[0].toString().startsWith('-playlist:')) {
        finished = true;
        const playlistName = args[0].split(':')[1];
        getPlaylists(d, playlistName).then((id) => {
          getPlaylist(d, id).then((playlist = []) => {
            addQueue(msg, playlist, 'all');
          });
        }).catch((err) => { msg.channel.send(`ERR: ${err}`); });
      }
      if (!finished) {
        searchMusic(d, encodeURI(args.join(' ')), offset, offset + 15).then((res) => {
          if (res === undefined) msg.channel.send('Unexpected results from plex. Is the URL set correctly?');
          else switch (res.size) {
            case 0:
              msg.channel.send('No results found');
              break;
            case 1:
              addQueue(msg, res, 0);
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
      }
    }).catch((err) => { msg.channel.send(`ERR: ${err}`); });
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