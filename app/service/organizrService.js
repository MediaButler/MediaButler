const axios = require('axios');

class organizrService {
    constructor(settings) {
        this._settings = settings;
        if (!settings.url) throw new Error('URL not set');
        if (!settings.apikey) throw new Error('APIKey not set');
    }

    get config() {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    plugin: 'MB/config/get'
                };
                axios.post(this._settings.url + '/api/?v1/plugin', { data }, { headers: { 'token': this._settings.apikey } })
                    .then((response) => {
                        resolve(response.data.data);
                    });
            }
            catch (err) { reject(err); }
        });
    }
}
module.exports = organizrService;