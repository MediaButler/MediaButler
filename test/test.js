var assert = require('assert');

describe('PlexPy Tests', function() {
  describe('Can get NowPlaying from PlexPy', function() {
    it('Gets data from API', function() {
      const guildId = 0;
      const getNowPlaying = require('../util/plexpy/getNowPlaying');
      getNowPlaying(guildId, true)
        .then((res) => {
          assert.equal(true, (res != undefined));
          assert.equal(1, res.data.stream_count);
          assert.equal(0, res.data.stream_count_transcode);
          assert.equal(1, res.data.stream_count_direct_play);
          assert.equal(0, res.data.stream_count_direct_stream);
          assert.equal(1, res.data.sessions.length);
        });
    });
  });
});