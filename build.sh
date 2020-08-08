#!/bin/sh
rm -rfv dist
npx typescript --project tsconfig.json
cp -avR src/_views dist/_views
cp -avR src/_public dist/_public