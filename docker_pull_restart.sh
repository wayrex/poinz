#!/bin/sh

# This script pulls the "latest" estimation image from the docker hub and restarts the running "estimation" container

# list running docker containers
echo "---- listing running docker containers ----"
docker ps

# pull newest estimation image
echo "---- pulling newest image 'estimation' ----"
docker pull wayrex/estimation:latest

# stop running
echo "---- stopping running docker container 'estimation' ----"
docker stop estimation

# remove "estimation" container
echo "---- deleting docker container 'estimation' ----"
docker rm estimation

# start new "estimation" container (will automatically pull from repo)
echo "---- starting new container ----"
docker run --name estimation --link redis:db -p 8080:3000 -d wayrex/estimation:latest

