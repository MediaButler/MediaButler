const Discord = require('discord.js');
class playerService {
    //    { // media
    //        artist: string,
    //        title: string,
    //        url: http(s) url,
    //        album: string,
    //        duration: int,
    //        image: string,
    //        year: int,
    //        user: Discord.User
    //    }
    constructor(channel) {
        this._channel = channel;
        this.queue = [];
        this.isPlaying = false;
        this.isPaused = false;
        this.lastPlayed = false;
        this.controller = null;
    }

    get() {
        return this.queue;
    }

    add(media) {
        try {
            if (!media.url) throw new Error('Media URL not found');
            if (!media.user) throw new Error('User not ser');
            if (!media.artist) throw new Error('No Artist found');
            if (!media.title) throw new Error('Song title not found');
            this.queue.push(media);
        }
        catch (err) {
            throw err;
        };
    }

    play() {
        if (this.isPaused) {
            this.isPaused = false;
            this.controller.resume();
        }
        else {
            this._channel.join().then((connection) => {
                this.controller = connection;
                this.isPlaying = true;
                connection.playArbitraryInput(queue[0].url);
                connection.setBitrate(128);
                connection.on('end', () => {
                    this.next();
                });
            });
        }
    }

    stop() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.queue = [];
            this.controller.end();
            this._channel.leave();
        }
    }

    next() {
        if (this.isPlaying) {
            this.controller.end();
            this.queue.shift();
            if (this.queue.length > 0) this.play();
            else this.stop();
        }
    }

    prev() {
        if (this.isPlaying) {
            this.queue.splice(1, 0, this.lastPlayed);
            this.next();
        }
    }

    pause() {
        if (this.isPlaying && !this.isPaused) {
            this.isPaused = true;
            this.controller.pause();
        }
    }

    shuffle() {
        if (this.isPlaying) {
            const item = this.queue.shift();
            let counter = this.queue.length;
            while (counter > 0) {
                const index = Math.floor(Math.random() * counter);
                counter--;
                const temp = this.queue[counter];
                this.queue[counter] = this.queue[index];
                this.queue[index] = temp;
            }
            this.queue.unshift(item);
            return true;
        }
    }

    move(from, to) {
        if (this.isPlaying) {
            this.queue.splice(to, 0, this.queue.splice(from, 1)[0]);
        }
    }

    remove(pos) {
        if (this.isPlaying) {
            this.queue.splice(pos, 1);
        }
    }
}
module.exports = playerService;