const tvShowModal = require('./nowPlayingTvShowModal');
const movieModal = require('./nowPlayingMovieModal');
const musicModal = require('./nowPlayingMusicModal');
module.exports = (nowPlayingItem) =>
{
  switch (nowPlayingItem.media_type) {
    case 'movie':
      return movieModal(nowPlayingItem);
    case 'episode':
      return tvShowModal(nowPlayingItem);
    case 'track':
      return musicModal(nowPlayingItem);
    default:
      throw new Error('Not a supported modal');
  }
};