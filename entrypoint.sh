#!/bin/bash
git clone https://github.com/MediaButler/MediaButler.git /home/nodejs/temp &> /dev/null
\cp -rf /home/nodejs/temp/* /home/nodejs/app/
rm -rf /home/nodejs/temp
sed -i 's/TOKEN_HERE/'"$TOKEN"'/g' /home/nodejs/app/settings.json
sed -i 's/PREFIX_HERE/'"$PREFIX"'/g' /home/nodejs/app/settings.json
cd /home/nodejs/app; npm install
exec "$@"
