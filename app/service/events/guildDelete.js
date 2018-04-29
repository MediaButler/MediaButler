module.exports = (client, guild) => {
    client.guildSettings.delete(guild.id);
    client.infoMsg(`Left Guild ${guild.name}`);
}