module.exports = member => {
  const guild = member.guild;
  guild.defaultChannel.send(`Please welcome ${member.user.username} to the server!`);
};
