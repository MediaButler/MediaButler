#!/bin/sh

echo "Moving settings file if it doesn't exist..."
if [ ! -f ${CONFIG_PATH}/default.json ]; then
  mv /opt/MediaButler/config/default.json $CONFIG_PATH
fi

echo "Updating permissions..."
for dir in /opt/MediaButler /etc/s6.d /config; do
  if $(find $dir ! -user $UID -o ! -group $GID|egrep '.' -q); then
    echo "Updating permissions in $dir..."
    chown -R $UID:$GID $dir
  else
    echo "Permissions in $dir are correct."
  fi
done
echo "Done updating permissions."

sed -i 's/TOKEN_HERE/'"$TOKEN"'/g' /opt/MediaButler/settings.json
sed -i 's/PREFIX_HERE/'"$PREFIX"'/g' /opt/MediaButler/settings.json
sed -i 's#PATH_HERE#'"$CONFIG_PATH"'#g' /opt/MediaButler/settings.json

sed -i 's/"prefix": "!",/"prefix": "'$PREFIX'",/' "$CONFIG_PATH"/default.json

su-exec $UID:$GID /bin/s6-svscan /etc/s6.d
