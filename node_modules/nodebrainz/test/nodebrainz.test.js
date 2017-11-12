"use strict";

var NB = require('../lib/nodebrainz')
    , assert = require("assert");

describe('nb', function() {

  // Describe the constructor
  describe('Constructor', function() {

    describe('Defaults', function() {
      it('limit', function() {
        var nb = new NB();
        assert.equal(nb.limit, 25);
      });

      it('host', function() {
        var nb = new NB();
        assert.equal(nb.host, 'musicbrainz.org');
      });

      it('port', function() {
        var nb = new NB();
        assert.equal(nb.port, 80);
      });

      it('path', function() {
        var nb = new NB();
        assert.equal(nb.basePath, '/ws/2/');
      });
    });

    it('Can set User Agent', function() {
      var nb = new NB({userAgent:'my-app/0.0.1 ( http://myapp.com )'});
      assert.equal(nb.userAgent, 'my-app/0.0.1 ( http://myapp.com )');

    });

    it('Can set Host', function() {
      var nb = new NB({host:'localhost'});
      assert.equal(nb.host, 'localhost');

    });

    it('Can set port', function() {
      var nb = new NB({port:5000});
      assert.equal(nb.port, 5000);
    });

    it('Can set Path', function() {
      var nb = new NB({basePath:'/path/to/data/'});
      assert.equal(nb.basePath, '/path/to/data/');
    });

    it('Can set Default limit', function() {
      var nb = new NB({defaultLimit:50});
      assert.equal(nb.limit, 50);
    });

    it('Can set all at the same time', function() {
      var nb = new NB({host:'localhost',port: 5001, basePath:'/path/to/data/',userAgent:'my-app/0.0.1 ( http://myapp.com )'});
      assert.equal(nb.userAgent, 'my-app/0.0.1 ( http://myapp.com )');
      assert.equal(nb.host, 'localhost');
      assert.equal(nb.port, 5001);
      assert.equal(nb.basePath, '/path/to/data/');
    });

  });

  // Describe lookup for...
  describe('Lookup', function() {

    // Artists
    describe('Artist', function() {

      it('By Artist ID', function(done) {
        var nb = new NB({mock: {}});

        nb.artist('e0140a67-e4d1-4f13-8a01-364355bee46e', {} , function(err, response) {
          assert.equal(err, null);
          assert.equal(nb.path, '/ws/2/artist/e0140a67-e4d1-4f13-8a01-364355bee46e?fmt=json');
          done();
        });
      });

      it('Only two arguments', function(done) {
        var nb = new NB({mock: {}});

        nb.artist('e0140a67-e4d1-4f13-8a01-364355bee46e', function(err, response) {
          assert.equal(err, null);
          assert.equal(nb.path, '/ws/2/artist/e0140a67-e4d1-4f13-8a01-364355bee46e?fmt=json');
          done();
        });
      });

      it('With subquery', function(done) {
        var nb = new NB({mock: {}});

        nb.artist('e0140a67-e4d1-4f13-8a01-364355bee46e', {inc:'aliases+release-groups'} , function(err, response) {
          assert.equal(err, null);
          assert.equal(nb.path, '/ws/2/artist/e0140a67-e4d1-4f13-8a01-364355bee46e?fmt=json&inc=aliases+release-groups');
          done();
        });
      });
    });

    // Release
    describe('Release', function() {

      it('By Release ID', function(done) {
        var nb = new NB({mock: {}});

        nb.release('6bfba6d5-71fc-454b-b3a0-63632a1459fa', function(err, response) {
          assert.equal(err, null);
          assert.equal(nb.path, '/ws/2/release/6bfba6d5-71fc-454b-b3a0-63632a1459fa?fmt=json');
          done();
        });
      });
    });

    // Release Group
    describe('Release Group', function() {

      it('By Release Group ID', function(done) {
        var nb = new NB({mock: {}});
        nb.releaseGroup('6bfba6d5-71fc-454b-b3a0-63632a1459fa', function(err, response) {
          assert.equal(err, null);
          assert.equal(nb.path, '/ws/2/release-group/6bfba6d5-71fc-454b-b3a0-63632a1459fa?fmt=json');
          done();
        });
      });
    });

    // Recording
    describe('Recording', function() {

      it('By Recording ID', function(done) {
        var nb = new NB({mock: {}});

        nb.recording('811cfc83-0c1a-44d6-b644-3740ac313016', function(err, response) {
          assert.equal(err, null);
          assert.equal(nb.path, '/ws/2/recording/811cfc83-0c1a-44d6-b644-3740ac313016?fmt=json');
          done();
        });
      });
    });

    // Work
    describe('Work', function() {

      it('By Work ID', function(done) {
        var nb = new NB({mock: {}});

        nb.work('282c08bb-9bd8-37be-9e36-f816d16f9a48', function(err, response) {
          assert.equal(err, null);
          assert.equal(nb.path, '/ws/2/work/282c08bb-9bd8-37be-9e36-f816d16f9a48?fmt=json');
          done();
        });
      });
    });

    // Label
    describe('Label', function() {

      it('By Label ID', function(done) {
        var nb = new NB({mock: {}});

        nb.label('dfd92cd3-4888-46d2-b968-328b1feb2642', function(err, response) {
          assert.equal(err, null);
          assert.equal(nb.path, '/ws/2/label/dfd92cd3-4888-46d2-b968-328b1feb2642?fmt=json');
          done();
        });
      });
    });

    // URL
    describe('URL', function() {

      it('By URL ID', function(done) {
        var nb = new NB({mock: {}});

        nb.url('13a37218-94c4-4844-8f6e-f843fe88e444', function(err, response) {
          assert.equal(err, null);
          assert.equal(nb.path, '/ws/2/url/13a37218-94c4-4844-8f6e-f843fe88e444?fmt=json');
          done();
        });
      });
    });

    // Area
    describe('Area', function() {

      it('By Area ID', function(done) {
        var nb = new NB({mock: {}});

        nb.area('db3634e7-5414-41dd-be0b-68ae71798dcd', function(err, response) {
          assert.equal(err, null);
          assert.equal(nb.path, '/ws/2/area/db3634e7-5414-41dd-be0b-68ae71798dcd?fmt=json');
          done();
        });
      });
    });
  });


  // Describe search
  describe('Search', function() {

    // A query must be set
    it('Must set query', function(done) {
      var nb = new NB({mock: {}});

      nb.search('artist', {} , function(err, response) {
        assert.notEqual(err, null);
        done();
      });
    });

    // Test search
    it('Basic functionality', function(done) {
      var nb = new NB({mock: {}});

      nb.search('artist', {artist:'tool', country:'US'} , function(err, response) {
        assert.equal(err, null);
        assert.equal(nb.path, '/ws/2/artist/?query=artist:\"tool\"%20AND%20country:\"US\"&limit=25&offset=0&fmt=json');
        done();
      });
    });

    // Test search
    it('Limit and offset', function(done) {
      var nb = new NB({mock: {}});

      nb.search('release', {artist:'pink floyd', limit:20, offset:5}, function(err, response) {
        assert.equal(err, null);
        assert.equal(nb.path, '/ws/2/release/?query=artist:"pink%20floyd"&limit=20&offset=5&fmt=json');
        done();
      });
    });

  });

  // Describe Lucene search
  describe('Lucene Search', function() {

    // A query must be set
    it('Must set query', function(done) {
      var nb = new NB({mock: {}});

      nb.luceneSearch('artist', {} , function(err, response) {
        assert.notEqual(err, null);
        done();
      });
    });

    it('Must set query', function(done) {
      var nb = new NB({mock: {}});

      nb.luceneSearch('artist', {limit:5} , function(err, response) {
        assert.notEqual(err, null);
        done();
      });
    });

    it('Must set query', function(done) {
      var nb = new NB({mock: {}});

      nb.luceneSearch('artist', {query:'artist:t??l AND -artist:"Jethro Tull"'} , function(err, response) {
        assert.equal(err, null);
        done();
      });
    });

    // Test search
    it('Basic functionality', function(done) {
      var nb = new NB({mock: {}});

      nb.luceneSearch('artist', {query:'artist:t??l AND -artist:"Jethro Tull"'} , function(err, response) {
        assert.equal(err, null);
        assert.equal(nb.path, '/ws/2/artist/?query=artist%3At%3F%3Fl%20AND%20-artist%3A%22Jethro%20Tull%22&limit=25&offset=0&fmt=json');
        done();
      });
    });

    // Limit and offset
    it('Limit and offset', function(done) {
      var nb = new NB({mock: {}});

      nb.luceneSearch('artist', {query:'artist:t??l AND -artist:"Jethro Tull"', limit:5, offset:10} , function(err, response) {
        assert.equal(err, null);
        assert.equal(nb.path, '/ws/2/artist/?query=artist%3At%3F%3Fl%20AND%20-artist%3A%22Jethro%20Tull%22&limit=5&offset=10&fmt=json');
        done();
      });
    });
  });

  // Describe Browse
  describe('Browse', function() {

    // A query must be set
    it('Basic functionality', function(done) {
      var nb = new NB({mock: {}});

      nb.browse('release-group', {artist:'e0140a67-e4d1-4f13-8a01-364355bee46e'}, function(err, response) {
          assert.equal(nb.path, '/ws/2/release-group?fmt=json&artist=e0140a67-e4d1-4f13-8a01-364355bee46e');
          done();
      });
    });

    // Limit and offset
    it('Limit and offset', function(done) {
      var nb = new NB({mock: {}});

      nb.browse('release-group', {artist:'e0140a67-e4d1-4f13-8a01-364355bee46e', limit:2, offset:1}, function(err, response) {
          assert.equal(nb.path, '/ws/2/release-group?fmt=json&artist=e0140a67-e4d1-4f13-8a01-364355bee46e&limit=2&offset=1');
          done();
      });

    });

    // A little more functionality
    it('Advance functionality', function(done) {
      var nb = new NB({mock: {}});

      nb.browse('release-group', {artist:'e0140a67-e4d1-4f13-8a01-364355bee46e', type:'album', limit:2, offset:1, inc: 'artist-credits'}, function(err, response) {
        assert.equal(nb.path, '/ws/2/release-group?fmt=json&artist=e0140a67-e4d1-4f13-8a01-364355bee46e&type=album&limit=2&offset=1&inc=artist-credits');
        done();
      });
    });

  });

  // Test that retry occurs, and fails after configured number of attempts.
  describe('Error Retry', function() {

    // A query must be set
    it('Basic functionality', function(done) {
      var nb = new NB({
        mock: {mock503: true},
        retryOn: true,
        retryDelay: 1500,
        retryCount: 1
      });

      assert.equal(nb.retryOn, true);
      assert.equal(nb.retryDelay, 1500);
      assert.equal(nb.retryCount, 1);
      nb.artist('e0140a67-e4d1-4f13-8a01-364355bee46e', {}, function(err) {
        assert.equal(err.statusCode, 503);
        done();
      });
    });
  });
});