#!/bin/bash
cd ../
grunt
cd ../hay.github.io/strikeout/
cp -rv ../../strikeout/dist/* .
git add .
git commit -m "A new version"
git push
