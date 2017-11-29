# MediaButler
[![Discord](https://img.shields.io/badge/Chat-Discord-738bd7.svg?style=for-the-badge)](https://discord.gg/nH9t5sm)
[![Wiki](https://img.shields.io/badge/Wiki-Installation-738bd7.svg?style=for-the-badge)](https://github.com/MediaButler/MediaButler/wiki/Install)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg?style=for-the-badge)](https://travis-ci.org/MediaButler/MediaButler)

Discord bot for use with PleX and several other apps that work with it.
Still early dev, but active and welcomes any/all help

## Prerequisites
* [NodeJS](https://nodejs.org/en/) - The server framework
* [npm](https://www.npmjs.com/) - Package manager

## Features
* Pull info for tv shows, films, anime, manga, books and music artists.
* Pull user stats from PlexPy.
* Pull user watched history from PlexPy.
* Pull Plex now playing info from PlexPy.
* Pull tonight's shows info from Sonarr.
* Add tv shows to Sonarr.
* Add movies to Radarr.
* Kill Plex streams.
* Have MediaButler remind you what and when.
* Show bot uptime.

## Installation
[Complete configuration tutorial](https://github.com/MediaButler/MediaButler/wiki/Install)

    git clone https://github.com/MediaButler/MediaButler.git
    cd MediaButler
    cp settings.example.json settings.json
    nano settings.json
    npm install

## Docker Installation
The TOKEN utilized by the container is from the process of setting up the MediaButler app with your Discord Server. Instructions for doing this can be found [HERE](https://github.com/MediaButler/MediaButler/wiki/Install:Discord "HERE").

### Usage
```
docker create \
  --name=mediabutler \
  --restart=on-failure \
  -e TOKEN=<discord token> \
  -e PREFIX=<command prefix> \
  tronyx/docker-mediabutler
```

### Parameters
* `--name` - The name of the container - Call it whatever you want.
* `--restart=on-failure` Container restart mode - Docker attempts to restarts the container if the container returns a non-zero exit code. More info [HERE](https://docs.docker.com/engine/admin/start-containers-automatically/ "HERE") on container restart policies.
* `-e TOKEN` - Your Discord token - This is needed for the bot to work with your Discord Server.
* `-e PREFIX` The command prefix character - This is what you want to prefix the commands for the bot, IE: !help, ?help, +help, -help, >help, etc.

### Info
* To monitor the logs of the container in realtime `docker logs -f mediabutler`.

* container version number

## Feature Requests

Please use our FeatHub to request and vote on features to make it's way to the bot [here](http://feathub.com/MediaButler/MediaButler)

[![Feature Requests](http://feathub.com/MediaButler/MediaButler?format=svg)](http://feathub.com/MediaButler/MediaButler)


## Support
The best place to get support is on our Discord channel, which you can get to by clicking [Here](https://discord.gg/nH9t5sm)


## Authors
* [Vertig0ne](https://github.com/Vertig0ne)
* [Tailchakra](https://github.com/Tailchakra)

## Trusted contributors
* [Tronyx (Docker)](https://github.com/christronyxyocum)

## License
This is free software under the GPL v2 open source license. Feel free to do with it what you wish, but any modification must be open sourced.
