const fs = require('fs');
exports.run = (client, msg, args) => {
  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    fs.readdir('./commands/', (err, files) => {
      if (err) msg.channel.send(err);
      msg.channel.send(`Reloading a total of ${files.length} commands.`);
      files.forEach(f => {
        let props = require(`./${f}`);
        msg.channel.send(`Loading Command: ${props.help.name}.`)
            .then(m => {
              client.reload(props.help.name)
                  .then(() => {
                    m.edit(`Successfully reloaded: ${props.help.name}`);
                  })
                  .catch(e => {
                    m.edit(`Command reload failed: ${props.help.name}\n\`\`\`${e.stack}\`\`\``);
                  });
            });
      })
    }) //return msg.channel.send(`I cannot find the command: ${args[0]}`);
  } else {
    msg.channel.send(`Reloading: ${command}`)
        .then(m => {
          client.reload(command)
              .then(() => {
                m.edit(`Successfully reloaded: ${command}`);
              })
              .catch(e => {
                m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
              });
        });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 4
};

exports.help = {
  name: 'reload',
  description: 'Reloads the command file, if it\'s been updated or modified.',
  usage: 'reload <commandname>'
};
