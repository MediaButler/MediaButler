const SonarrAPI = require('sonarr-api');

class radarrService {
    constructor(settings) {
        if (!settings) throw new Error('Settings not provided');
        this._settings = settings;
        const regex = /(?:([A-Za-z]+):)?(?:\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?/g;
        const details = regex.exec(settings.url);
        let useSsl = false;
        let port = 80;
        if (details[1] == 'https') { useSsl = true; port = 443; }
        if (details[3] !== undefined) port = details[3];
        this._api = new SonarrAPI({ hostname: details[2], apiKey: settings.apikey, port: port, urlBase: `${details[4]}`, ssl: useSsl });
    }
    
    get monthCalendar() {
        return new Promise((resolve, reject) => {
            try {
                const today = new Date();
                const beginningMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const endMonth = new Date(today.getFullYear(), today.getMonth(), 31);
                _api.get('calendar', { 'start': beginningMonth.toISOString(), 'end': endMonth.toISOString() })
                    .then((result) => {
                        resolve(result);
                    });
            }
            catch (err) { reject(err); }
        });
    }

    getMovie(filter) {
        return new Promise((resolve, reject) => {
            try {
                let qry;
                if (filter.imdbId) qry = `imdb:${filter.imdbId}`;
                if (filter.name) qry = filter.name;
                if (!qry) throw new Error('No query');
                _api.get('movie/lookup', { 'term': `${qry}` })
                    .then((result) => {
                        if (result.length === 0) throw new Error('No results for query');
                        resolve(result[0]);
                    })
            }
            catch (err) {
                reject(err);
            }
        });
    }

    addMovie(movie) {
        return new Promise((resolve, reject) => {
            try {
                if (!movie.imdbId) throw new Error('imdbId not set');
                if (!movie.profile && !movie.profileId) throw new Error('Profile not set');
                if (!movie.rootPath) throw new Error('Root path not set');

                if (!movie.profileId) this.getProfile(show.profile).then((profile) => { movie.profileId = profile.id; });

                this.getMovie({ imdbId: show.imdbId, limit: 1 }).then((getResult) => {
                    const data = {
                        'tmdbId': getResult.tmdbId,
                        'title': getResult.title,
                        'qualityProfileId': movie.profileId,
                        'titleSlug': getResult.titleSlug,
                        'images': getResult.images,
                        'monitored': true,
                        'rootFolderPath': movie.rootPath || this._settings.rootPath,
                        'year': getResult.year
                      };
                    _api.post('movie', data)
                        .then((result) => {
                            if (result.title == undefined || result.title == null) reject('Failed to add');
                            resolve(true);
                        });
                })
            }
            catch (err) { reject(err); }
        });
    }
}
module.exports = radarrService;