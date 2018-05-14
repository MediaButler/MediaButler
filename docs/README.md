# MediaButler

## What is it?

MediaButler is a bot for Discord that interacts with several services around media integration, it couples what could be several different bots and merges it into one. Handles Music playback, management applications and server applications.

## Supported Integrations

Ticks are currently supported. Others are planned support.

- [X] Plex
- [ ] Emby
- [X] Sonarr
- [X] Radarr
- [ ] Lidarr
- [X] Tautulli
- [ ] Ombi

## Current "feature set"

  - Automatic Configuration using [Organizr v2](https://github.com/causefx/Organizr/tree/v2-develop) and [organizr-mediabutler plugin](https://github.com/vertig0ne/organizr-mediabutler)
  - Switchable language selector (Currently 1 language - HELP WANTED!)
  - Music Player with support for multiple media sources (eg. Plex)
  - (ADMIN)Plex/Emby/Tautulli - Retrieve whats currently playing on the server and their statistics
  - (ADMIN PLEX PLEXPASS)Plex/Tautulli - Kill an item thats being streamed. 
  - (SONARR/RADARR) Adds movies and tv shows to your Sonarr/Radarr
  - (SONARR/RADARR) Retrieve the schedule for the next day/week
  - (OMBI/INT) Request tv shows, movies, books, comics, music either via a single command
  - (OMBI/INT) Approve requests for processing
  - 

## Installation

You will need:
 - Node.js (Tested with v10.1.0)
 - NPM (Tested with v5.6.0/v6.0.1)

### Native

    git clone https://github.com/vertig0ne/MediaButler.git -b v1
    cd MediaButler
    npm install
    TOKEN=DISCORD_TOKEN npm start

### Docker

    docker create --name=mediabutler \
        -e TOKEN=DISCORD_TOKEN \
        -v ~/.docker/MediaButler:/config:rw \
        vertig0ne/mediabutler:v1

## Current Known bugs

  - Sonarr/Radarr may fail to validate if there are no items in the calendar for the current month

## Troubleshooting

App does not start with an 'unexpected identifier' error
Use [nvm](https://github.com/creationix/nvm) to upgrade your node version
    
    nvm install 10.1.0 --latest-npm
    nvm alias default node
    rm -rf node_modules
    npm install

