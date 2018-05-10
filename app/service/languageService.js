const format = require('string-format');
const fs = require('fs');
const process = require('process');
const Discord = require('discord.js');

module.exports = class languageService {
    constructor(logService) {
        try {
            this.logService = logService;
            this.langCore = new Discord.Collection();
            fs.readdir(`${process.cwd()}/lang/`, (err, files) => {
                if (err) client.errorMsg(err);
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

    get(lang, key, values = []) {
        const lang2 = this.langCore.get(lang.toString());
        return this.format(eval(`lang2.${key}`), values);
    }

    format(str, values = []) {
        return format(str, values);
    }

    async resolve(lang, value) {
        lang = this.langCore.get(lang.toString());
        let g;
        let i;
        Object.keys(lang).slice(2).forEach((e) => {
            const evl = eval(`lang.${e}`);
            Object.keys(evl).forEach((k) => {
                if (eval(`lang.${e}.${k}.name`) == value) {
                    g = `${e}`;
                    i = `${k}`;
                }
            });
        });
        return `${g}.${i}`;
    }
}