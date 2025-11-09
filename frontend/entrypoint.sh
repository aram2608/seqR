#!/usr/bin/env sh
set -e

# Render runtime config template if present
if [ -f /usr/share/nginx/html/assets/config.template.js ]; then
  envsubst < /usr/share/nginx/html/assets/config.template.js > /usr/share/nginx/html/assets/config.js
fi

# If the first arg looks like an option, prefix with nginx
if [ "${1#-}" != "$1" ]; then
  set -- nginx "$@"
fi

exec "$@"
