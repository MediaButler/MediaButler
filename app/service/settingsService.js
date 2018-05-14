const Enmap = require('enmap');
const EnmapSQLite = require('enmap-sqlite');

module.exports = class settingsService {
    constructor(client) {
        this.client = client;
        let sqlProvider;
        if (this.client.isDocker) sqlProvider = new EnmapSQLite({ name: 'guildSettings', dataDir: '/config' });
        else sqlProvider = new EnmapSQLite({ name: 'guildSettings' });
        this.provider = new Enmap({ provider: sqlProvider });
    }

    create(key) {
        const p = {
            "prefix": "!",
            "lang": "en"
        }
        this.set(key, p);
        return this.get(key);
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