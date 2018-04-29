module.exports = (client, guild) => {
    let settings = client.guildSettings.get(guild.id);
    if (!settings) {
        settings = require('../internal/defaultGuild.json');
        settings.uuid = uuid();
        client.guildSettings.set(guild.id, settings);
        client.infoMsg(`Joined Guild ${guild.name}`);
    }
}