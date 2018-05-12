const axios = require('axios');

class organizrService {
    constructor(settings) {
        this._settings = settings;
        if (!settings.url) throw new Error('URL not set');
        if (!settings.apikey) throw new Error('APIKey not set');
    }

    async getConfig() {
        try {
            const response = await axios.post(this._settings.url + '/api/?v1/plugin', 'data[plugin]=MB/config/get', { headers: { 'token': this._settings.apikey } });
            return response.data.data;
        }
        catch (err) { throw err; }
    }
}
module.exports = organizrService;