const fs = require('fs');
const { exec } = require('child_process');
exports.run = (bot, msg) => {
  if (fs.existsSync(`${process.cwd()}/.git`)) {
    let gitVersion;    
    exec('git rev-parse HEAD', {
      cwd: process.cwd()
    }, (err, stdout) => {
      if (err) throw err;
      gitVersion = stdout.trim();
      msg.channel.send(`You are running ${bot.mbVersion}-${gitVersion}`);      
    });
    return;
  }
  msg.channel.send(`You are running ${bot.mbVersion}-RELEASE`);
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};
exports.help = {
  name: 'version',
  description: 'Displays the bot Version',
  usage: 'bot version'
};