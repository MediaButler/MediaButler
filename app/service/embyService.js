module.exports = class embyService {
    constructor(settings) {
        this._settings = settings;
        if (!settings.url) throw new Error('No URL set');
        if (!settings.token) throw new Error('No Token Provided');
    }

    async getNowPlaying() {
        return await this._apiGet('Sessions', true);
    }

    async killStream() {

    }

    async _apiGet(command, args) {
        try {
            return await axios({
                method: 'GET',
                url: `${this._settings.url}/${command}?api_key=${this._settings.apikey}`,
                json: args
            });
        }
        catch (err) { throw err; }
    }

    async _apiPost(command, args) {
        return await axios({
            method: 'POST',
            url: `${this._settings.url}/${command}?api_key=${this._settings.apikey}`,
            json: args
        });
    }
}