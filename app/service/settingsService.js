const Enmap = require('enmap');
const EnmapSQLite = require('enmap-sqlite');

module.exports = class settingsService {
    constructor() {
        this.provider = new Enmap({ provider: new EnmapSQLite({ name: 'guildSettings' }) });
    }
    
    get(key) {
        return this.provider.get(key);
    }

    set(key, value) {
        return this.provider.set(key, value);
    }

    delete(key) {
        return this.provider.delete(key);
    }
}