#!/bin/bash

cd ~

echo "Updating Package Lists..."
sudo apt-get update -y

echo "Upgrading..."
sudo apt-get upgrade -y

echo "Creating Swap File..."
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

echo "Installing Prerequisites..."
sudo apt-get install git nodejs npm -y

echo "Getting Git Host Keys..."
touch ~/.ssh/known_hosts
ssh-keyscan gitlab.cs.cf.ac.uk >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts

echo "Preparing Git SSH key..."
touch ~/.ssh/git.key
cat << `EOF` >> ~/.ssh/git.key
${git_key}
`EOF`
chmod 400 ~/.ssh/git.key

echo "Cloning Repo..."
ssh-agent bash -c 'ssh-add ~/.ssh/git.key; git clone git@gitlab.cs.cf.ac.uk:c1630757/cardiff-council-cycling-iot-web.git'

echo "Switching Branch..."
cd ~/cardiff-council-cycling-iot-web/
git checkout ${git_branch}

echo "Installing Dependencies..."
sudo npm install

echo "Setting Config..."
touch config/app.conf
cat << `EOF` >> config/app.conf
{
  "server": {
    "port": 80
  },
  "mysql": {
    "host": "${db_host}",
    "user": "${db_username}",
    "password": "${db_password}",
    "database": "clean_air"
  }
}
`EOF`

echo "Building Project..."
npm run build:prod

echo "Starting Server..."
sudo npm run start:prod