module.exports = (client) => {
    client.infoMsg('Bot Sucessfully started and connected to Discord');
    client.user.setPresence({game: {name: `MediaButler v${client.mbVersion}`, type: 0}});
}