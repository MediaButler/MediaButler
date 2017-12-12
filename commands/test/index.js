const fs = require('fs');
exports.run = (bot, msg, args = [], perm) => {
  fs.readdir(`./commands/${this.help.name}/`, (err, files) => {
    let hasRun = false;
    let sc = args[0];
    if (err) console.error(err);
    if (!args[0]) sc = 'help';
    files.forEach((f) => {
      if (f == `${sc}.js`) {
        const props = require(`./${f}`);
        if (props) {
          if (perm < props.conf.permLevel) return;
          args.splice(0, 1);
          props.run(bot, msg, args, perm);
          hasRun = true;
        }
      }
    });
    if (!hasRun) {
      const props = require('./search.js');
      if (perm < props.conf.permLevel) return;      
      props.run(bot, msg, args, perm);
    }
  });
};
exports.help = {
  name: 'test',
  description: 'test',
  usage: 'test'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};