#!/usr/bin/env bash
# Downloads the three libraries index.html loads, into vendor/.
# Run once. After it succeeds the app no longer needs a network connection
# for its JavaScript (web fonts still come from Google Fonts).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p vendor
base=https://cdnjs.cloudflare.com/ajax/libs
curl -fsSL -o vendor/react.production.min.js     "$base/react/18.2.0/umd/react.production.min.js"
curl -fsSL -o vendor/react-dom.production.min.js "$base/react-dom/18.2.0/umd/react-dom.production.min.js"
curl -fsSL -o vendor/babel.min.js                "$base/babel-standalone/7.23.5/babel.min.js"
ls -la vendor/
echo "Done. Reload the app; the CDN fallbacks in index.html will no longer fire."
