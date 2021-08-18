#!/bin/bash

echo -n "Are you sure that you want to deploy the phonebook? (y/n)"
read answer

if [ "$answer" != "${answer#[Yy]}" ] ;then
  cd "${0%/*}"
  echo "-> Current directory: $(pwd)"
  cd ./phonebook-frontend
  echo "-> Moving to frontend directory: $(pwd)"
  npm run build
  echo "-> Built frontend website for deployment"
  cp -r ./build ../phonebook-backend
  echo "-> Copying build directory to backend $(pwd)/../phonebook-backend/"
  cd ../../
  echo "-> Moving to root of repository: $(pwd)"
  git add .
  echo "-> Adding changed files to "
  git commit -m "Deploying latest phonebok build"
  echo "-> Committing latest build to git"
  git subtree push --prefix part3/phonebook-backend heroku main
  echo "-> Pushed subtree backend directory to heroku"
else
  echo "-> Exiting..."
fi