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
        this.settings = null;
    }

    async run(message, args) {
        this.language = message.guild.settings.lang;
        this.languageService = message.client.languageService;
        this.settings = message.guild.settings;
        let p;
        switch (args) {
            case 'bot':
                p = await this.bot(message);
                break;
            case 'stream':
                p = await this.plex(message);
                break;
            default:
                p = await this.basic(message);
                break;
        }
        return p;
    }

    bot(message) {
        const embed = new Discord.RichEmbed()
            .setTimestamp()
            .setThumbnail(message.author.iconURL)
            .addField(this.languageService.get(this.language, 'bot.info.uptimeField'), this.languageService.get(this.language, 'bot.info.uptimeResult', this._format(process.uptime())), true)
            .addField(this.languageService.get(this.language, 'bot.info.activeGuildField'), this.languageService.get(this.language, 'bot.info.activeGuildResult', this.client.guilds.size), true)
            .addField(this.languageService.get(this.language, 'bot.info.languageField'), this.languageService.get(this.language, 'bot.info.languageResult', this.languageService.getLanguages().length), true)
            .addField(this.languageService.get(this.language, 'bot.info.versionField'), this.languageService.get(this.language, 'bot.info.versionResult', this.client.mbVersion), true)
            .setColor(6583245);
        return message.reply({ embed });
    }

    basic(message) {
        return;
    }

    async stream(message) {
        const embed = new Discord.RichEmbed()
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

    async history() {

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