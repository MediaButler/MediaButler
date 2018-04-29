module.exports = {
    run: (client, message, args, perms) => {
        message.channel.send('Ping?')
            .then(msg => {
                msg.edit(`I'm still working! (It took me ${msg.createdTimestamp - message.createdTimestamp}ms to respond)`);
            });
    },
    conf: {
        name: 'ping',
        alias: ['p']
    }
}