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

    get languages() {
        return this.langCore.keys();
    }

    get(lang, key, values = []) {
        const lang = this.langCore.get(lang);
        return this.format(eval(`lang.${key}`), values);
    }

    format(str, values = []) {
        return format(str, values);
    }
}