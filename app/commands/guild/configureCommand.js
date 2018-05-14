const Discord = require('discord.js');
const command = require('../base');
const uuid = require('uuid');
const organizrService = require('../../service/organizrService');
const tautulliService = require('../../service/tautulliService');
const sonarrService = require('../../service/sonarrService');
const radarrService = require('../../service/radarrService');
const plexService = require('../../service/plexService');
const plexTokenService = require('../../service/plexTokenService');
const embyService = require('../../service/embyService');

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
        this.embed = new Discord.RichEmbed()
                .setTitle(this.languageService.get(this.lang, 'bot.configure.title'))
                .setDescription(this.languageService.get(this.lang, 'bot.configure.starting'))
                .setColor(891626)
                .setTimestamp()
                d.setAuthor(message.guild.name);
        args = this.parseArgs(args);

        if (args.element != 'checkauth' && args.element != 'update' &&
            (!args.url || !args.apikey || !args.element)) throw new Error('Could not parse url, api key or item to configure');
        const msg = await message.reply(this.embed);

        let r;
        switch (args.element) {
            case 'checkauth':
                r = await this.checkPlexAuth(msg, args);
                break;
            case 'update':
                const s = this.client.settingsService.get(msg.guild.id);
                if (!s.organizr.url && !s.organizr.apikey) throw new Error('No Organizr configuration saved');
                r = await this.configureOrganizr(msg, s.organizr);
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
                this.embed.setDescription(this.languageService.get(this.lang, 'bot.configure.configuring', this.languageService.get(this.lang, 'bot.configure.sonarr')));
                msg.edit(this.embed);
                r = await this.configureSonarr(msg, args);
                break;
            case 'radarr':
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
        this.embed = new Discord.RichEmbed()
            .setTitle(this.languageService.get(this.lang, 'bot.configure.organizrTitle'))
            .setDescription(this.languageService.get(this.lang, 'bot.configure.organizrDescr'))
            .setColor(891626)
            .setTimestamp()
            .setThumbnail('https://i.imgur.com/vvsZjod.png')
            .setAuthor(msg.guild.name);
        msg.edit(this.embed);

        const o = new organizrService(args);
        const c = await o.getConfig();
        if (c) {
            const s = this.client.settingsService.get(msg.guild.id);
            s.organizr = { 'url': args.url, 'apikey': args.apikey };
            if (c.prefix != s.prefix) {
                s.prefix = c.prefix;
                this.embed.addField(this.languageService.get(this.lang, 'bot.configure.prefix'), this.languageService.get(this.lang, 'bot.prefix.changePrefix', c.prefix), true);
            }
            this.client.settingsService.set(msg.guild.id, s);
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.organizr'), this.languageService.get(this.lang, 'bot.configure.success'), true);
            msg.edit(this.embed);

            if ((c.emby.url && c.emby.url != '') && (c.emby.token && c.emby.token != '')) this.configureEmby(msg, c.emby);
            else { this.embed.addField(this.languageService.get(this.lang, 'bot.configure.emby'), this.languageService.get(this.lang, 'bot.configure.insufficent'), true); msg.edit(this.embed); }

            if ((c.tautulli.url && c.tautulli.url != '') && (c.tautulli.apikey && c.tautulli.apikey != '')) this.configureTautulli(msg, c.tautulli);
            else { this.embed.addField(this.languageService.get(this.lang, 'bot.configure.tautulli'), this.languageService.get(this.lang, 'bot.configure.insufficent'), true); msg.edit(this.embed); }

            if (c.sonarr.defaultProfile) c.sonarr.profile = c.sonarr.defaultProfile;
            if (c.sonarr.defaultRootPath) c.sonarr.rootpath = c.sonarr.defaultRootPath;
            if ((c.sonarr.url && c.sonarr.url != '') && (c.sonarr.apikey && c.sonarr.apikey != '') && (c.sonarr.profile && c.sonarr.profile != '')
                && (c.sonarr.rootpath && c.sonarr.rootpath != '')) this.configureSonarr(msg, c.sonarr);
            else { this.embed.addField(this.languageService.get(this.lang, 'bot.configure.sonarr'), this.languageService.get(this.lang, 'bot.configure.insufficent'), true); msg.edit(this.embed); }

            if (c.radarr.defaultProfile) c.radarr.profile = c.radarr.defaultProfile;
            if (c.radarr.defaultRootPath) c.radarr.rootpath = c.radarr.defaultRootPath;
            if ((c.radarr.url && c.radarr.url != '') && (c.radarr.apikey && c.radarr.apikey != '') && (c.radarr.profile && c.radarr.profile != '')
                && (c.radarr.rootpath && c.radarr.rootpath != '')) this.configureRadarr(msg, c.radarr);
            else { this.embed.addField(this.languageService.get(this.lang, 'bot.configure.radarr'), this.languageService.get(this.lang, 'bot.configure.insufficent'), true); msg.edit(this.embed); }

            if ((c.plex.url && c.plex.url != '') && (s.plex.token && s.plex.token == '')) this.configurePlex(msg, c.plex);
            else if (s.plex.token && s.plex.token != '') this.checkPlex(msg, c.plex);
            else { this.embed.addField(this.languageService.get(this.lang, 'bot.configure.plex'), this.languageService.get(this.lang, 'bot.configure.insufficent'), true); msg.edit(this.embed); }
        }
        else {
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.organizr'), this.languageService.get(this.lang, 'bot.configure.failed'), true);
            msg.edit(this.embed);
        }
        return msg;
    }

    _updateSettings(element, id, args) {
        const s = this.client.settingsService.get(id);
        let update = eval(`s.${element}`);
        update = args;
        this.client.settingsService.set(id, s);
    }

    async _testTautulli(msg, args) {
        try {
            const t = new tautulliService(args);
            const e = await t.getNowPlaying();
            if (e.message && e.message.startsWith('Invalid')) {
                return false;
            } else return true;
        } catch (err) { throw err; }
    }

    async _testSonarr(msg, args) {
        try {
            const s = new sonarrService(args);
            const c = await s.getMonthCalendar();
            if (c[0].seriesId) {
                return true;
            } else return false;
        } catch (err) { throw err; }
    }

    async _testRadarr(msg, args) {
        try {
            const s = new radarrService(args);
            const c = await s.getMonthCalendar();
            if (c[0].tmdbId) return true;
            else return false;
        } catch (err) { throw err; }
    }

    async _testPlex(msg, args) {
        try {
            const pl = new plexService(args, this.client);
            const t = await pl.getNowPlaying();
            if (t.MediaContainer) return true;
            else return false;
        } catch (err) { throw err; }
    }

    async _testEmby(msg, args) {
        try {
            const es = new embyService(args, this.client);
            if (await es.getNowPlaying().length) return true;
            else return false;
        } catch (err) { throw err; }
    }

    async configureTautulli(msg, args) {
        try {
            if (await this._testTautulli(msg, args)) {
                this._updateSettings('tautulli', msg.guild.id, { 'url': args.url, 'apikey': args.apikey });
                this.embed.addField(this.languageService.get(this.lang, 'bot.configure.tautulli'), this.languageService.get(this.lang, 'bot.configure.success'), true);
                return msg.edit(this.embed);
            }
            throw new Error('Unable to connect to Tautulli');
        }
        catch (err) {
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.tautulli'), this.languageService.get(this.lang, 'bot.configure.failed', `${err.name}: ${err.message}`), true);
            return msg.edit(this.embed);
        }
    }

    async configureSonarr(msg, args) {
        try {
            if (!args.rootpath || !args.profile) throw new Error('Root Path or Profile name not specifified');
            if (await this._testSonarr(msg, args)) {
                this._updateSettings('sonarr', msg.guild.id, { 'url': args.url, 'apikey': args.apikey, 'profile': args.profile, 'rootPath': args.rootpath });
                this.embed.addField(this.languageService.get(this.lang, 'bot.configure.sonarr'), this.languageService.get(this.lang, 'bot.configure.success'), true);
                return msg.edit(this.embed);
            }
            throw new Error('Unable to connect to Sonarr');
        }
        catch (err) {
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.sonarr'), this.languageService.get(this.lang, 'bot.configure.failed', `${err.message}`), true);
            return msg.edit(this.embed);
        }
    }

    async configureRadarr(msg, args) {
        try {
            if (!args.rootpath || !args.profile) throw new Error('Root Path or Profile name not specifified');
            if (await this._testRadarr(msg, args)) {
                this._updateSettings('radarr', msg.guild.id, { 'url': args.url, 'apikey': args.apikey, 'profile': args.profile, 'rootPath': args.rootpath });
                this.embed.addField(this.languageService.get(this.lang, 'bot.configure.radarr'), this.languageService.get(this.lang, 'bot.configure.success'), true);
                return msg.edit(this.embed);
            }
            throw new Error('Unable to connect to Radarr');
        }
        catch (err) {
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.radarr'), this.languageService.get(this.lang, 'bot.configure.failed', `${err.message}`), true);
            return msg.edit(this.embed);
        }
    }

    async configurePlex(msg, args) {
        try {
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
        catch (err) {
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.plex'), this.languageService.get(this.lang, 'bot.configure.failed', `${err.message}`), true);
            return msg.edit(this.embed);
        }
    }

    async configureEmby(msg, args) {
        try {
            if (await this._testEmby(msg, args)) {
                this._updateSettings('emby', msg.guild.id, { 'url': args.url, 'token': args.token });
                this.embed.addField(this.languageService.get(this.lang, 'bot.configure.emby'), this.languageService.get(this.lang, 'bot.configure.success'), true);
                return msg.edit(this.embed);
            }
            throw new Error('Unable to connect to Emby');
        }
        catch (err) {
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.emby'), this.languageService.get(this.lang, 'bot.configure.failed', `${err.name}: ${err.message}`), true);
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
                if (this._testPlex(ch, this.client)) {
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

    async checkPlex(msg, args) {
        try {
            if (this._testPlex(args, this.client)) {
                this.embed.addField(this.languageService.get(this.lang, 'bot.configure.plex'), this.languageService.get(this.lang, 'bot.configure.success'), true);
                return msg.edit(this.embed);
            }
            this.embed.addField(this.languageService.get(this.lang, 'bot.configure.plex'), this.languageService.get(this.lang, 'bot.configure.failed'), true);
            return msg.edit(this.embed);
        } catch (err) { throw err; }
    }

    parseArgs(args) {
        const r = { url: false, apikey: false, element: false, rootpath: false, profile: false };
        args = args.split(',');
        args.forEach((arg) => {
            if (arg == '-checkauth') { r.element = 'checkauth'; return r; }
            if (arg == '-update') { r.element = 'update'; return r; }

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