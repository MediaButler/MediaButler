const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('reconnecting', () => reqEvent('reconnecting')(client));
  client.on('disconnect', () => reqEvent('disconnect')(client));
  client.on('message', reqEvent('message'));
//  client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
//  client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
//  client.on('guildBanAdd', reqEvent('guildBanAdd'));
//  client.on('guildBanRemove', reqEvent('guildBanRemove'));
  client.on('guildCreate', reqEvent('guildCreate'));
  client.on('guildDelete', reqEvent('guildDelete'));  
};
