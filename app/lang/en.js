module.exports = {
    // Basic characteristics
    "code": "en",
    "name": "english",

    // Section
    "bot": {
        "name": "bot",
        "alias": "bot",
        "description": "Actions focused around controlling the bot (like prefix)",

        "notEnoughArguments": "Unable to determine which command to run.",

        // Command
        "ping": {
            // Command details
            "name": "ping",
            "alias": "p",
            "description": "Ping? Pong!",

            // Responses
            "ping": "Ping?",
            "reply": "I'm still working! (It took me {0}ms to respond)"
        },
        "prefix": {
            "name": "prefix",
            "description": "Change's prefix",

            "noPrefix": "No Prefix found",
            "changePrefix": "Prefix was sucessfully changed to `{0}`"
        },
        "language": {
            "name": "language",
            "alias": "setlang",
            "description": "Changes current language",

            "success": "Hooray, we are now using the english language",
            "failedArgs": "Unable to determine language to change to",
            "failedSame": "Cannot change to same language",
            "failedNotFound": "Cannot find language locally to change to"
        },
        "info": {
            "name": "info",
            "alias": "i",
            "description": "Can reveal information about the bot",

            "uptimeField": "Bot's Uptime",
            "uptimeResult": "{0}s",
            "activeGuildField": "Active Guilds",
            "activeGuildResult": "{0} guilds",
            "languageField": "Available Languages",
            "languageResult": "{0} languages",
            "versionField": "Bot Version",
            "versionResult": "v{0}",
        },
        "configure": {
            "name": "configure",
            "description": "configures things",

            "title": "Configurator",
            "starting": "Starting up the configurator. Please expect this to change",

            "success": "Success",
            "successLong": "Sucessfully configured {0}",
            "failed": "Failed {0}",
            "insufficent": "Insufficent Details",
            "configuring": "Configuring {0} for use with MediaButler",

            "organizrTitle": "Organizr Configuration",
            "organizrDescr": "Currently retrieving confguration from Organizr to configure all services without hassle",
            "organizr": "Organizr",
            "sonarr": "Sonarr",
            "radarr": "Radarr",
            "tautulli": "Tautulli",
            "plex": "Plex",
            "emby": "Emby",
            "webToken": "URL: {url}\nCODE: {code}\nTHEN: !bot configure -checkauth",
            "checkPlexAuth": "Checking Plex for code authentication and retreiving details",
        }
    },
    "plex": {
        "name": "plex",
        "alias": "plex",
        "description": "Actions focused around controlling Plex"
    }
}