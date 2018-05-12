const Discord = require('discord.js');
const command = require('../base');
const uuid = require('uuid');
const organizrService = require('../../service/organizrService');
const tautulliService = require('../../service/tautulliService');
const sonarrService = require('../../service/sonarrService');
const radarrService = require('../../service/radarrService');
const plexService = require('../../service/plexService');
const plexTokenService = require('../../service/plexTokenService');

module.exports = class configureCommand extends command {
    constructor(client) {
        const info = {
            "name": "configure",
            "group": "bot",
            "type": "guild"
        }
        super(client, info);
        this.languageService = client.languageService;
    }

    async run(message, args) {
        this.lang = message.guild.settings.lang;
        this.embed = new Discord.RichEmbed();
        this.embed.setTitle(this.languageService.get(this.lang, 'bot.configure.title'));
        this.embed.setDescription(this.languageService.get(this.lang, 'bot.configure.starting'));
        this.embed.setColor(891626);
        this.embed.setTimestamp();
        this.embed.setAuthor(message.guild.name);
        args = this.parseArgs(args);

        if (args.element != 'checkauth' && (!args.url || !args.apikey || !args.element)) throw new Error('Could not parse url, api key or item to configure');

        const msg = await message.reply(this.embed);
        let r;
        switch (args.element) {
            case 'checkauth':
                r = await this.checkPlexAuth(msg, args);
                break;
            case 'organizr':
                r = await this.configureOrganizr(msg, args);
                break;
            case 'tautulli':
                this.embed.setDescription(this.languageService.get(this.lang, 'bot.configure.configuring', this.languageService.get(this.lang, 'bot.configure.tautulli')));
                msg.edit(this.embed);
                r = await this.configureTautulli(msg, args);
                break;
            case 'sonarr':
                if (!args.rootpath || !args.profile) throw new Error('Root Path or Profile name not specifified');
                this.embed.setDescription(this.languageService.get(this.lang, 'bot.configure.configuring', this.languageService.get(this.lang, 'bot.configure.sonarr')));
                msg.edit(this.embed);
                r = await this.configureSonarr(msg, args);
                break;
            case 'radarr':
                if (!args.rootpath || !args.profile) throw new Error('Root Path or Profile name not specifified');
                this.embed.setDescription(this.languageService.get(this.lang, 'bot.configure.configuring', this.languageService.get(this.lang, 'bot.configure.radarr')));
                msg.edit(this.embed);
                r = await this.configureSonarr(msg, args);
                break;
            default:
                return msg.edit(`Unable to process this element right now`);
        }
        return r;
    }

    async configureOrganizr(msg, args) {
        this.embed = new Discord.RichEmbed();
        this.embed.setTitle(this.languageService.get(this.lang, 'bot.configure.organizrTitle'));
        this.embed.setDescription(this.languageService.get(this.lang, 'bot.configure.organizrDescr'));
        this.embed.setColor(891626);
        this.embed.setTimestamp();
        this.embed.setThumbnail('https://i.imgur.com/vvsZjod.png');
        this.embed.setAuthor(msg.guild.name);
        msg.edit(this.embed);

        const o = new organizrService(args)
        const c = await o.getConfig();
        if (c) {
            const s = this.client.settingsService.get(msg.guild.id);
            s.organizr = { 'url': args.url, 'apikey': args.apikey };
            this.client.settingsService.set(msg.guild.id, s);
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.organizr'), this.languageService.get(this.lang, 'bot.configure.success'), true);
            msg.edit(this.embed);

            if (c.tautulli.url && c.tautulli.apikey) this.configureTautulli(msg, c.tautulli);
            else { this.embed.addField(this.languageService.get(this.lang, 'bot.configure.tautulli'), this.languageService.get(this.lang, 'bot.configure.insufficent'), true); msg.edit(this.embed); }

            if (c.sonarr.url && c.sonarr.apikey && c.sonarr.defaultRootPath && c.sonarr.defaultProfile) this.configureSonarr(msg, c.sonarr);
            else { this.embed.addField(this.languageService.get(this.lang, 'bot.configure.sonarr'), this.languageService.get(this.lang, 'bot.configure.insufficent'), true); msg.edit(this.embed); }

            if (c.radarr.url && c.radarr.apikey && c.radarr.defaultRootPath && c.radarr.defaultProfile) this.configureRadarr(msg, c.radarr);
            else { this.embed.addField(this.languageService.get(this.lang, 'bot.configure.radarr'), this.languageService.get(this.lang, 'bot.configure.insufficent'), true); msg.edit(this.embed); }

            if (c.plex.url) this.configurePlex(msg, c.plex);
            else { this.embed.addField(this.languageService.get(this.lang, 'bot.configure.plex'), this.languageService.get(this.lang, 'bot.configure.insufficent'), true); msg.edit(this.embed); }
        }
        else {
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.organizr'), this.languageService.get(this.lang, 'bot.configure.failed'), true);
            msg.edit(this.embed);
        }
        return msg;
    }

    async configureTautulli(msg, args) {
        const t = new tautulliService(args);
        const e = await t.getNowPlaying();
        if (e.result == 'success') {
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.tautulli'), this.languageService.get(this.lang, 'bot.configure.success'), true);
            const s = this.client.settingsService.get(msg.guild.id);
            s.tautulli = { 'url': args.url, 'apikey': args.apikey };
            this.client.settingsService.set(msg.guild.id, s);
            return msg.edit(this.embed);
        }
        this.embed.addField(this.languageService.get(this.lang, 'bot.configure.tautulli'), this.languageService.get(this.lang, 'bot.configure.failed'), true);
        return msg.edit(this.embed);
    }

    async configureSonarr(msg, args) {
        const s = new sonarrService(args);
        const c = await s.getMonthCalendar();
        if (c[0].seriesId) {
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.sonarr'), this.languageService.get(this.lang, 'bot.configure.success'), true);
            const se = this.client.settingsService.get(msg.guild.id);
            se.sonarr = { 'url': args.url, 'apikey': args.apikey };
            this.client.settingsService.set(msg.guild.id, se);
            return msg.edit(this.embed);
        }
        this.embed.addField(this.languageService.get(this.lang, 'bot.configure.sonarr'), this.languageService.get(this.lang, 'bot.configure.failed'), true);
        return msg.edit(this.embed);
    }

    async configureRadarr(msg, args) {
        const r = new radarrService(args);
        const c = await r.getMonthCalendar();
        if (c[0].tmdbId) {
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.radarr'), this.languageService.get(this.lang, 'bot.configure.success'), true);
            const se = this.client.settingsService.get(msg.guild.id);
            se.radarr = { 'url': args.url, 'apikey': args.apikey, };
            this.client.settingsService.set(msg.guild.id, se);
            return msg.edit(this.embed);
        }
        this.embed.addField(this.languageService.get(this.lang, 'bot.configure.radarr'), this.languageService.get(this.lang, 'bot.configure.failed'), true);
        return msg.edit(this.embed);
    }

    async configurePlex(msg, args) {
        if (!args.uuid) args.uuid = uuid();
        const p = new plexTokenService(args, this.client);
        const token = await p.getPin();
        if (token) {
            const se = this.client.settingsService.get(msg.guild.id);
            se.plex = { 'uuid': args.uuid, 'url': args.url, 'pinToken': token };
            this.client.settingsService.set(msg.guild.id, se);
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.plex'), this.languageService.get(this.lang, 'bot.configure.webToken', { 'url': 'https://plex.tv/pin', 'code': token.code }), true);
            return msg.edit(this.embed);
        }

    }

    async checkPlexAuth(msg, args) {
        try {
            this.embed.setDescription(this.languageService.get(this.lang, 'bot.configure.checkPlexAuth'));
            msg.edit(this.embed);
            const se = await this.client.settingsService.get(msg.guild.id);
            const p = new plexTokenService(se.plex, this.client);
            const token = await p.checkPin();
            if (token) {
                const ch = { 'uuid': msg.guild.settings.plex.uuid, 'url': msg.guild.settings.plex.url, 'token': token }
                const pl = new plexService(ch, this.client);
                const t = await pl.getNowPlaying();
                if (t.MediaContainer) {
                    se.plex = ch;
                    await this.client.settingsService.set(msg.guild.id, se);
                    this.embed.addField(this.languageService.get(this.lang, 'bot.configure.plex'), this.languageService.get(this.lang, 'bot.configure.successLong', this.languageService.get(this.lang, 'bot.configure.plex')), true);
                    return msg.edit(this.embed);
                }
            }
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.plex'), this.languageService.get(this.lang, 'bot.configure.failed'), true);
            return msg.edit(this.embed);
        } catch (err) { this.embed.addField(this.languageService.get(this.lang, 'bot.configure.plex'), err.message, true); return msg.edit(this.embed); }
    }

    parseArgs(args) {
        const r = { url: false, apikey: false, element: false, rootpath: false, profile: false };
        args = args.split(',');
        args.forEach((arg) => {
            if (arg == '-checkauth') {
                r.element = 'checkauth';
                return r;
            }
            const urlRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/gi;
            const u = urlRegex.exec(arg);
            if (u && !r.url) r.url = u.input;

            const apikeyRegex = /^([a-z0-9]{20,32})$/;
            const a = apikeyRegex.exec(arg);
            if (a && !r.apikey) r.apikey = a.input;

            const apiElementRegex = /^(organizr|sonarr|radarr|tautulli|plex|emby)$/i;
            const e = apiElementRegex.exec(arg);
            if (e && !r.element) r.element = e.input;

            const rootPathRegex = /^([A-Z]:\\|\/)/g;
            const p = rootPathRegex.exec(arg);
            if (p && !r.rootpath) r.rootpath = p.input;

            if (r.element == 'sonarr' || r.element == 'radarr') {
                if (!u && !a && !e && !p && !r.profile) r.profile = arg;
            }
        });
        return r;
    }

}