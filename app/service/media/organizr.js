class organizrService {
    constructor(url, apikey) {
        this._url = url;
        this._apikey = apikey;
    }

    get config() {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    plugin: 'MB/config/get'
                };
                axios.post(this._url + '/api/?v1/plugin', { data }, { headers: { 'token': this._apikey } })
                    .then((response) => {
                        resolve(response.data.data);
                    });
            }
            catch (err) { reject(err); }
        }
    }
}