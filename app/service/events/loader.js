const reqEvent = (event) => require(`./${event}`);
module.exports = client => {
    client.on('ready', () => reqEvent('ready')(client));
    client.on('reconnecting', () => reqEvent('reconnecting')(client));
    client.on('disconnect', (evnt) => reqEvent('disconnect')(client, evnt));
    client.on('message', (message) => reqEvent('message')(message));
    client.on('guildCreate', (guild) => reqEvent('guildCreate')(guild));
    client.on('guildDelete', (guild) => reqEvent('guildDelete')(guild));  
    client.on('debug', (info) => reqEvent('debug')(client, info));
    client.on('error', (error) => reqEvent('error')(client, error));
    client.on('warn', (warning) => reqEvent('warn')(client, warning));
    client.on('guildMemberAdd', (member) => reqEvent('guildMemberAdd')(client, member));
    client.on('guildMemberRemove', (member) => reqEvent('guildMemberAdd')(client, member));
};