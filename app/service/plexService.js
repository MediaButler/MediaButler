const plexApi = require('plex-api');
const plexPinAuth = require('plex-api-pinauth')();

class plexService {
    constructor(settings) {
        this.hasToken = false;
        if (!settings.plex.url) throw new Error('URL is not set');
        if (settings.plex.token) this.hasToken = true;
        const regex = /^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{5})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$/g;
        const details = regex.exec(settings.plex.url);
        let usePort = 80;
        let useHttps = false;
        if (details[1] == 'https') { useHttps = true; usePort = 443; }
        if (details[3]) usePort = details[3];
        const opts = {
            options: {
                identifier: settings.uuid,
                product: 'MediaButler',
                version: client.mbVersion,
                deviceName: message.guild.name,
                device: 'Discord',
            },
            authenticator: plexPinAuth,
            hostname: details[2],
            port: usePort,
            https: useHttps,
            token: settings.plex.token,
        }
        if (settings.pinToken) this.pinToken = settings.pinToken;
        this._api = new plexApi(opts);
    }

    getPinAuth() {
        if (!this.hasToken) {
            this._api.authenticator.getNewPin().then((pin) => {
                this.pinToken = pin;
            });
        }
    }

    checkPinAuth() {
        if (this.pinToken && !this.hasToken) {
            this._api.authenticator.checkPinForAuth(this.pinToken, (err, status) => {
                if (err) throw err;
                this
            });
        } else {
            throw new Error('No Token to Authenticate to');
        }
    }

    get nowPlaying() {
        // Active streams
        return new Promise((resolve, reject) => {
            try {
                this._api.query('/status/sessions')
                    .then((res) => {
                        resolve(res);
                    }, (err) => { throw err });
            }
            catch (err) { reject(err); }
        });
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