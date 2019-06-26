#!/bin/bash

if [ $1 -eq "build" ]; then
  (cd src && hugo)
  (cd src && node node_modules/polymer-cli/bin/polymer.js build)
elif [ $1 -eq "test" ]; then
  (cd src && hugo)
  (cd src && node node_modules/polymer-cli/bin/polymer.js build)
  (cd src && node node_modules/workbox/workbox generateSW workbox-config.js)
  (cd src && polymer serve --hostname 0.0.0.0 --compile never)
elif [ $1 -eq "release" ]; then
  (cd src && hugo)
  (cd src && node node_modules/polymer-cli/bin/polymer.js build)
  (cd src && node node_modules/workbox/workbox generateSW workbox-config.js)
  (cd src && cp build/es6-bundled/blah)
else
  echo "Please specify build, test, or release as an argument to this script"
fi

