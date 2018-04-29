module.exports = {
    run: (client, message, args, perms) => {
        let err;
        if (args.length == 0) err = 'No prefix defined';

        if (err) {
            message.channel.send(`Error: ${err}`);
            return;
        }
        const settings = client.guildSettings.get(message.guild.id);
        settings.prefix = args;
        client.guildSettings.set(message.guild.id, settings);
        message.channel.send(`Updated prefix to ${args}`);
    },
    conf: {
        name: 'prefix',
        alias: [],
        description: 'Changes bot prefix'
    }
}