const format = require('string-format');

class languageService {
    constructor(language) {
        try {
            this.core = require(`../lang/${language}`);
        }
        catch (err) { throw err; }
    }

    get(key, values = []) {
        return format(eval(`this.core.${key}`), values);
    }
}