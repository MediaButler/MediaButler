const fs = require('fs');
exports.run = (client, msg, args = []) => {
  msg.channel.startTyping();
  let sendMessage = '```asciidoc\n';
  fs.readdir(`${process.cwd()}/commands/`, (err, files) => {
    if (err) msg.channel.send(err);
    sendMessage += `Reloading a total of ${files.length} commands\n\n`;
    msg.channel.send(`${sendMessage}\`\`\``)
      .then((m) => {
        files.forEach(f => {
          const props = require(`${process.cwd()}/commands/${f}`);
          if (props.conf.enabled) {
            m.edit(`${sendMessage}\nLoading Command: ${props.help.name}.\n\`\`\``);
            client.reload(props.help.name)
              .then(() => {
                sendMessage += `Sucessfully reloaded: ${props.help.name}\n`;
                m.edit(`${sendMessage}\`\`\``);
              })
              .catch(e => {
                sendMessage += `\n\nCommand reload failed: ${props.help.name}\n\`\`\`${e.stack}\`\`\``;
                m.edit(`${sendMessage}\`\`\``);
              });
          } else {
            m.edit(`${sendMessage}\nSkipping Command: ${props.help.name}.\n\`\`\``);
          }
        });
      });
  });
  msg.channel.stopTyping();
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 4
};
exports.help = {
  name: 'reload',
  description: 'Reloads bot code',
  usage: 'bot reload'
};