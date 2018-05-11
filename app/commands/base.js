module.exports = class command {
    // {
    //  "name": "bot.ping.name",
    //  "alias": [bot.ping.alias],
    //  "group": "bot.name",
    //  "description": "bot.ping.description",
    //  "type": "guild"/"dm"
    // }
    constructor(client, info) {
        this.client = client;
        this.info = info;
        this._responses = new Set();
    }

    run(message, args) {
        throw new Error('Base command does nothing');
    }
}