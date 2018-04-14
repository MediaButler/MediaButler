module.exports = (time) =>
{
  const hrs = ~~(time / 3600);
  const mins = ~~((time % 3600) / 60);
  const secs = time % 60;
  let ret = '';
  if (hrs > 0) {
    ret += `${hrs}h `;
  }
  if (mins > 0) {
    ret += `${mins}m `;
  }
  if (secs > 0) {
    ret += `${secs}s`;
  }
  return ret;
};
    