#!/usr/bin/env bash
\cp -f /home/nodejs/app/settings.sqlite /home/nodejs/app/settings.sqlite.keep
git clone https://github.com/MediaButler/MediaButler.git /home/nodejs/temp &> /dev/null
\cp -rf /home/nodejs/temp/* /home/nodejs/app/
rm -rf /home/nodejs/temp
\cp -f /home/nodejs/app/settings.sqlite.keep /home/nodejs/app/settings.sqlite
sed -i 's/TOKEN_HERE/'"$TOKEN"'/g' /home/nodejs/app/settings.json
sed -i 's/PREFIX_HERE/'"$PREFIX"'/g' /home/nodejs/app/settings.json
cd /home/nodejs/app; npm install
exec "$@"
