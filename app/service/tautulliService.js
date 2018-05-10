class tautulliService {
    constructor(settings) {
        this._settings = settings;
        if (!settings.url) throw new Error('URL not set');
        if (!settings.apikey) throw new Error('APIKey not set');
    }

    getNowPlaying() {
        return new Promise((resolve, reject) => {
            try {
                this._api('get_activity', {})
                    .then((res) => {
                        resolve(res.data.response);
                    })
            }
            catch (err) { reject(err); }
        });
    }

    getHistory(limit = null) {
        return new Promise((resolve, reject) => {
            try {
                if (limit == null) limit = 3;
                const params = {
                    'user': user,
                    'length': limit
                };
                this._api('get_history', params).then((r) => {
                    resolve(res.data.response);
                });
            }
            catch (err) { reject(err); }
        });
    }

    getUserStats(user) {
        return new Promise((resolve, reject) => {
            try {
                let userId;
                this._getUserId(user).then((r) => {
                    userId = r;
                    const params = {
                        'user_id': userId
                    };
                    this._api('get_user_watch_time_stats', params)
                        .then((res) => {
                            resolve(res.data.response);
                        });
                });
            }
            catch (err) { reject(err); }
        });
    }

    _getUserId(username) {
        return new Promise((resolve, reject) => {
            try {
                this._api('get_users', {})
                    .then((res) => {
                        const u = res.data.response.data.find(o => o.username === username);
                        if (u === undefined) reject('Unable to match user');
                        resolve(u.user_id);
                    });
            }
            catch (err) { reject(err); }
        });
    }

    _api(command, args) {
        return new Promise((resolve, reject) => {
            try {
                let params = '&';
                if (typeof (args) == 'object') {
                    for (let key of Object.keys(args)) {
                        params += `${key}=${args[key]}&`;
                    }
                }
                resolve(axios({
                    method: 'GET',
                    url: `${this._settings.url}/api/v2?apikey=${this._settings.apikey}&cmd=${command}${params}`
                }));
            }
            catch (err) { reject(err); }
        });
    }
}
module.exports = tautulliService;