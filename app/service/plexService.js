const plexApi = require('plex-api');

class plexService {
    constructor(settings, client) {
        this.hasToken = true;
        console.log(settings);
        if (!settings.url) throw new Error('URL is not set');
        if (!settings.token) throw new Error('Token not provided');
        if (!settings.uuid) throw new Error('No identifier provided');
        const regex = /^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{5})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$/g;
        const details = regex.exec(settings.url);
        let usePort = 80;
        let useHttps = false;
        if (details[1] == 'https') { useHttps = true; usePort = 443; }
        if (details[3]) usePort = details[3];
        const opts = {
            options: {
                identifier: settings.uuid,
                product: 'MediaButler',
                version: client.mbVersion,
                deviceName: 'plexService',
                device: 'Discord',
            },
            hostname: details[2],
            port: usePort,
            https: useHttps,
            token: settings.token,
        }
        if (settings.pinToken) this.pinToken = settings.pinToken;
        this._api = new plexApi(opts);
    }

    async getPinAuth() {
        if (!this.hasToken) {
            this.pinToken = await this._api.authenticator.getNewPin();
            return this.pinToken;
        }
    }

    async checkPinAuth() {
        if (this.pinToken) {
            console.log('checking for auth');

            const token = await this._api.authenticator.checkPinForAuth(this.pinToken);
            //, (err, status) => {
            //    if (err) throw err;
            //    if (status == 'authorized') {
            console.log('have auth');
            console.log(token);
            console.log(this._api.authenticator.token);
            //        this.hasToken = true;
            return this._api.authenticator.token;
            //    }
            //    console.log(status);
            //    return status;
            //});
        } else {
            throw new Error('No Token to Authenticate to');
        }
    }

    async getNowPlaying() {
        // Active streams
            try {
                const res = await this._api.query('/status/sessions')
                return res;
            }
            catch (err) { throw err; }
    }

    get audioPlaylists() {
        // Return all playlists
    }

    killStream(id, reason) {
        return new Promise((resolve, reject) => {
            try {
                this._api.perform(`/status/sessions/terminate?sessionId=${id}&reason=${reason}`).then(function () {
                    resolve();
                }, (err) => { throw err; });
            }
            catch (err) { reject(err); }
        });
    }

    audioPlaylist() {
        // Get single playlist from playlists
    }
}
module.exports = plexService;