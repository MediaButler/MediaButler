module.exports = (message) => {
    const client = message.client;
    let command;
    let args;
    let perms;
    
    switch (message.channel.type) {
        case 'dm':
        case 'group':
            break;

        case 'voice':
            break;

        default:
            client.debugMsg(`Message received from ${message.author.username}: ${message.content}`);
            if (message.content.startsWith('!')) {
                command = message.content.split(' ')[0].slice(1);
                args = message.content.split(' ').slice(1);
                client.debugMsg(`COMMAND: ${command} ARGS: ${args}`);
                let action;
                if (client.guildCommandAlias.has(command)) action = client.guildCommandAlias.get(command);
                if (client.guildCommands.has(command)) action = client.guildCommands.get(command);
                if (action) {
                    client.debugMsg(`Running command ${action.conf.name}`);
                    action.run(client, message, args, perms);
                }
            }
            break;
    }
}