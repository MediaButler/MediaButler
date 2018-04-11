module.exports = (message) => {
  let counter = message.guild.mediaQueue.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = message.guild.mediaQueue[counter];
    message.guild.mediaQueue[counter] = message.guild.mediaQueue[index];
    message.guild.mediaQueue[index] = temp;
  }
  return message.guild.mediaQueue;
};