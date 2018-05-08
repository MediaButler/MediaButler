const format = require('string-format');

module.exports = (language) => {
    const l = require(`./${language}`);
    const r = {
        get: (key, values = []) => { return format(eval(`l.${key}`), values); }
    };
    return r;
}