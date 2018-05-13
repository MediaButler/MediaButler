# MediaButler

## What is it?

MediaButler is a bot for Discord that interacts with several services around media integration, it couples what could be several different bots and merges it into one. Handles Music playback, management applications and server applications.

## Supported Integrations

Ticks are currently supported. Others are planned support.

[X] Plex
[ ] Emby
[X] Sonarr
[X] Radarr
[ ] Lidarr
[X] Tautulli
[ ] Ombi

## Installation

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

  - Sonarr/Radarr may fail to validate if there are no items configured