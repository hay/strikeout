#!/bin/bash
cd ../
grunt
cd ../hay.github.io/kittylist/
cp -rv ../../kittylist/dist/* .
git add .
git commit -m "A new version"
git push
