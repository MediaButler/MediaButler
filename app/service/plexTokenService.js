var PlexPin = require('plex-pin');
module.exports = class plexTokenService {
    constructor(settings, client) {
        this.headers = {
            'X-Plex-Product': 'MediaButler',
            'X-Plex-Version': client.mbVersion,
            'X-Plex-Client-Identifier': settings.uuid,
            'X-Plex-Device': 'Discord',
            'X-Plex-Device-Name': 'plexService',
            'X-Plex-Platform': 'Linux',
            'X-Plex-Platform-Version': client.mbVersion,          
            'Accept-Language': 'en'
        };
        this.settings = settings;
        this._api = new PlexPin(this.headers);
    }

    async getPin() {
        const p = await this._api.requestPin();
        if (p) {
            this._api.setExpireTime(p);
            this._api.setPin(p);
            this._api.setRequestId(p);
            const r = {
                'code': this._api.getPin(),
                'id': this._api.getRequestId(),
                'expires': this._api.getExpireTime()
            };
            return r;
        } else { throw new Error('Unable to get a pin'); }
    }

    async checkPin() {
        if (!this.settings.pinToken) throw new Error('No PIN Token to Check');
        console.log(this.settings.pinToken);
        const r = await this._api.checkPin(this.settings.pinToken.id);
        if (r) {
            this._api.setAuthToken(r);

            if (!this._api.getAuthToken()) {
                throw new Error('Unable to authenticate token');
            }
            return this._api.getAuthToken();
        } else {
            throw new Error('PIN Token expired');
        }
    }
}