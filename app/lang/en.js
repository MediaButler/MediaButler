module.exports = {
    // Basic characteristics
    "code": "en",
    "name": "english",

    // Section
    "bot": {
        "name": "bot",
        "alias": "bot",
        "description": "Actions focused around controlling the bot (like prefix)",

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
        }
    },
    "plex": {
        "name": "plex",
        "alias": "plex",
        "description": "Actions focused around controlling Plex"
    }
}