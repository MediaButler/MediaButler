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
            "changePrefix": "Prefix was sucessfully changed to {0}"
        }
    },
    "plex": {
        "name": "plex",
        "alias": "plex",
        "description": "Actions focused around controlling Plex"
    }
}