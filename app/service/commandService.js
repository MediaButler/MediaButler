module.exports = class commandService {
    constructor(message, command, args = null) {
        this._message = message;
        this.command = command;
        this.args = args;
        this._client = this.message.client;
        this.response = null;
        this.responsePositions = null;
    }

    async run() {
        this.command = new this.command(this._client);
        if (this.command.info.type == 'guild' && !this.message.guild) 
            return this._client.logService.debug(`Command ${this.command.info.name} was stopped due to running in a nonguild channel`);

		if(this.command.info.nsfw && !this.message.channel.nsfw) 
            return this._client.logService.debug(`Command ${this.command.info.name} was stopped due to running in a nsfw channel`);
        
        try {
            this._client.logService.debug(`Attempting to run ${this.command.info.group}.${this.command.info.name}`);
            const promise = this.command.run(this, this.args);
            const ret = await promise;
            return ret;
        }
        catch (err) {
            return this.reply(`ERR: ${err.name}: ${err.message}`);
        }
    }

    finalize(response) {
        if(this.response) this.deleteResponses();
		this.response = {};
        this.responsePositions = {};
        
        if (response instanceof Array) {
            response.forEach((r) => {
                const channel = (response instanceof Array ? response[0] : response).channel;
                const id = channel.id;
                if(!this.response[id]) {
                    this.response[id] = [];
					this.responsePositions[id] = -1;
                }
                this.responses[id].push(response);
            });
        } else if (response) {
            const id = response.channel.id;
			this.response[id] = [response];
            this.responsePositions[id] = -1;
        }
    }

    deleteResponses() {
        Object.keys(this.response).forEach((res) => {
            const r = this.response[res];
            r.forEach((rr) => {
                rr.delete();
                delete this.response[res];
            })
        });
    }

    respond({ type = 'reply', content, options }) {
        // Should edit previous message or send new
        switch (type) {
            case 'plain':
                return this.message.channel.send(content, options);
            case 'reply':
                return this.message.channel.send(content, options);
            case 'direct':
                return this.message.author.send(content, options);
            default:
                throw new Error('Unknown response type');
        }
    }

    reply(content, options) {
        return this.respond({ type: 'reply', content, options });
    }

    direct(content, options) {
        return this.respond({ type: 'direct', content, options });
    }

    say(content, options) {
        return this.respond({ type: 'plain', content, options });
    }

    get message() {
        return this._message;
    }

    get client() {
        return this._client;
    }

    get author() {
        return this._message.author;
    }

    get guilds() {
        this.client.guilds;
    }

    get guild() {
        return this._message.channel.guild;
    }

    get createdTimestamp() {
        return this._message.createdTimestamp;
    }
}