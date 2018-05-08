const format = require('string-format');

module.exports = {
    // Basic characteristics
    "code": "en",
    "name": "english",
    "format": (key, value = []) => {
        return format(key, value);
    },

    // Section
    "bot": {
        // Command
        "ping": {
            // Command name
            "name": "ping",
            "alias": "p",
            "description": "Ping? Pong!",

            // Responses
            "ping": "Ping?",
            "reply": "I'm still working! (It took me {0}ms to respond)"
        }
    }
}