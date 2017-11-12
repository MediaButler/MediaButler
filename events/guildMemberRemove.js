module.exports = member => {
  const guild = member.guild;
  guild.defaultChannel.send(`Please say goodbye to ${member.user.username} we will miss you!`);
};
