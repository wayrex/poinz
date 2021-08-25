# PoinZ docker file

# For the following commands, we expect that your user is part of the "docker" usergroup
# (then you can run the docker command without "sudo")

# use the following command to build
# docker build -t xeronimus/poinz .

# start the container with interactive shell
# docker run -i -t xeronimus/poinz /bin/bash

# start the container locally in detached mode
# docker run -p 3000:3000 -d xeronimus/poinz

# node 14.15.3 LTS  aka "lts-buster"    see  https://hub.docker.com/_/node
FROM node:lts-buster

# Create app directory
RUN mkdir -p /usr/src/estimation/public
RUN mkdir -p /usr/src/estimation/lib
WORKDIR /usr/src/estimation

# Bundle app source
COPY deploy/public /usr/src/estimation/public
COPY deploy/lib /usr/src/estimation/lib
COPY deploy/package.json /usr/src/estimation/

# install app dependencies
RUN npm install --production

# expose port 3000
EXPOSE 3000

CMD npm start
