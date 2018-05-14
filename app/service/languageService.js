const format = require('string-format');
const fs = require('fs');
const Enmap = require('enmap');
const process = require('process');
const Discord = require('discord.js');
const logService = require('./logService');

module.exports = class languageService {
    constructor(logService) {
        try {
            this.logService = logService;
            if (!logService) logService = new logService();
            this.langCore = new Enmap();
            fs.readdir(`${process.cwd()}/lang/`, (err, files) => {
                if (err) return this.logService.error(err);
                files.forEach(f => {
                    const prop = require(`${process.cwd()}/lang/${f}`);
                    this.langCore.set(prop.code, prop);
                    this.logService.info(`Loaded language: ${prop.code}`);
                });
            });
        }
        catch (err) { throw err; }
    }

    getLanguages() {
        const t = Array.from(this.langCore.keys());
        return t;
    }

    get(lang, key, values = null) {
        const lang2 = this.langCore.get(lang.toString());
        return this.format(eval(`lang2.${key}`), values);
    }

    format(str, values) {
        return format(str, values);
    }

    resolve(lang, value) {
        let g = this.resolveGroup(lang, value);
        g = g.toString();
        let c = this.resolveCommand(lang, value);
        c = c.toString();
        return `${g}.${c}`;
    }

    resolveAlias(lang, value) {
        lang = this.langCore.get(lang.toString());
        let g;
        let c;
        Object.keys(lang).slice(2).forEach((gr) => {
            const evl = eval(`lang.${gr}`);
            Object.keys(evl).forEach((co) => {
                if (eval(`lang.${gr}.${co}.alias`) == value) {
                    g = gr;
                    c = co;
                }
            });
        });
        return `${g}.${c}`;
    }

    resolveGroup(lang, value) {
        lang = this.langCore.get(lang.toString());
        let g;
        Object.keys(lang).slice(2).forEach((e) => {
            if (eval(`lang.${e}.name`) == value) {
                g = `${e}`;
            }
        });
        return g;
    }

    async resolveCommand(lang, group, value) {
        lang = this.langCore.get(lang.toString());
        const evl = eval(`lang.${group}`);
        let i;
        Object.keys(evl).forEach((k) => {
            const a = eval(`lang.${group}.${k}.name`);
            if (eval(`lang.${group}.${k}.name`) == value) {
                i = `${k}`;
            }
        });
        return i;
    }
}