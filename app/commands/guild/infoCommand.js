const Discord = require('discord.js');
const command = require('../base');
const tautulliService = require('../../service/tautulliService');

module.exports = class infoCommand extends command {
    constructor(client) {
        const info = {
            "name": "info",
            "group": "bot",
            "type": "guild"
        }
        super(client, info);
        this.language = null;
        this.languageService = null;
    }

    async run(message, args) {
        this.language = message.guild.settings.lang;
        this.languageService = message.client.languageService;
        let p;
        switch (args) {
            case 'bot':
                p = await this.botInfo(message);
            case 'plex':
                p = await this.plexInfo(message);
            default:
                p = await this.basicInfo(message);
        }
        return p;
    }

    botInfo(message) {
        const l = message.client.languageService;
        const cl = message.guild.settings.lang;
        const e = new Discord.RichEmbed()
            .setTimestamp()
            .setThumbnail(message.author.iconURL)
            .addField(l.get(cl, 'bot.info.uptimeField'), l.get(cl, 'bot.info.uptimeResult', this._format(process.uptime())), true)
            .addField(l.get(cl, 'bot.info.activeGuildField'), l.get(cl, 'bot.info.activeGuildResult', message.client.guilds.size), true)
            .addField(l.get(cl, 'bot.info.languageField'), l.get(cl, 'bot.info.languageResult', l.getLanguages().length), true)
            .addField(l.get(cl, 'bot.info.versionField'), l.get(cl, 'bot.info.versionResult', message.client.mbVersion), true)
            .setColor(6583245);
        return message.reply({ embed: e });
    }

    basicInfo(message) {
        return;
    }

    async plexInfo(message) {
        const e = new Discord.RichEmbed()
            .setTitle(this.languageService.get(this.language, 'bot.info.nowPlaying'))
            .setColor(8204568)
            .setTimestamp()
            .setThumbnail('https://i.imgur.com/0wcbLr1.png')
            .setAuthor(message.guild.name);

        const ts = new tautulliService(message.guild.settings.tautulli);
        const res = await ts.getNowPlaying();
        if (res) {
            e.setDescription(`${this.languageService.get(this.language, 'bot.info.nowPlayingDescription')}\n`
                + `**${this.languageService.get(this.language,'bot.info.nowPlayingCurrentStreams', res.data.sessions.length)}**`);
            res.data.sessions.forEach(s => {
                console.log(s);
                let title, line;
                switch (s.media_type) {
                    case 'episode':
                        title = `${s.grandparent_title} - ${s.parent_title} - ${s.title}`;
                        line = `Video: ${s.stream_video_decision} / ${s.stream_video_resolution}p / ${s.stream_video_bitrate}kbps / ${s.stream_video_codec}\n`
                            + `Audio: ${s.stream_audio_decision} / ${s.stream_audio_bitrate}kbps / ${s.stream_audio_codec}\n`
                            + `User: ${s.username} / ${s.player} / Stream Key: ${s.session_key}`;
                        break;
                    case 'track':
                        title = `${s.grandparent_title} - ${s.title}`;
                        line = `Audio: ${s.stream_audio_decision} / ${s.stream_audio_bitrate}kbps / ${s.stream_audio_codec}\n`
                            + `User: ${s.username} / ${s.player} / Stream Key: ${s.session_key}`;
                        break;
                    default:
                        title = `${s.title}`;
                        line = `Video: ${s.stream_video_decision} / ${s.stream_video_resolution}p /  ${s.stream_video_bitrate}kbps / ${s.stream_video_codec}\n`
                            + `Audio: ${s.stream_audio_decision} / ${s.stream_audio_bitrate}kbps / ${s.stream_audio_codec}\n`
                            + `User: ${s.username} / ${s.player} / Stream Key: ${s.session_key}`;
                        break;
                }
                e.addField(title, line, false);
            });
            e.setFooter(`Called by ${message.author.username}`, message.author.avatarURL);
            return message.reply({ embed: e });
        }
    }

    _format(seconds) {
        const pad = (s) => {
            return (s < 10 ? '0' : '') + s;
        }
        var hours = Math.floor(seconds / (60 * 60));
        var minutes = Math.floor(seconds % (60 * 60) / 60);
        var seconds = Math.floor(seconds % 60);
        return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
    }
}