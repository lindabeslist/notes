#!/bin/sh

echo "Starting yarn install"
corepack enable
echo "YARN INSTALL"
yarn config set cache-folder /usr/src/app/.yarn --global
yarn install --network-timeout 1000000

echo "Done."

exec "$@"
