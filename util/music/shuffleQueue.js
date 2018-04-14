module.exports = (message) => {
  const item = message.guild.mediaQueue.shift();
  let counter = message.guild.mediaQueue.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = message.guild.mediaQueue[counter];
    message.guild.mediaQueue[counter] = message.guild.mediaQueue[index];
    message.guild.mediaQueue[index] = temp;
  }
  message.guild.mediaQueue.unshift(item);
  return message.guild.mediaQueue;
};