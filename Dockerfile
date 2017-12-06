
# Dockerfile goes inside root directory generally named 'Dockerfile'

# Insert minimum viable image

FROM node:8-alpine

# App listens on 3000, so expose it
# Mongodb listens on 27017

# create a directory inside container to store app contents

RUN mkdir -p /usr/src/app

# switch to that directory

WORKDIR /usr/src/app

# Copy package.json , giving it the name package.json

COPY package.json package.json

# install dependencies and clean up cache using "npm cache clean"
RUN apk add --no-cache libc6-compat && npm install && npm cache verify

# Copy everything from current local directory to current container directory
COPY . .

EXPOSE 3000

# CMD may vary depending on how your start script

CMD ["node", "server/server.js"]

# required: run this command when container is launched
# only one CMD allowed, so if there are mulitple, last one wins
