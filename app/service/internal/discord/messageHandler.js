module.exports = class messageHandler {
    constructor(client, logService, languageService) {
        this.client = client;
        this.logService = logService;
        this.languageService = languageService;
    }

    handle(message, oldMessage = null) {
        // find in repository
        // instanciate it
    }
}