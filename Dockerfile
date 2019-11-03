FROM node:lts-alpine
MAINTAINER Evan Roubekas, evan@roubekas.com

# Env
ENV TIME_ZONE=Canada/Pacific
ENV ENV_NAME dev
ENV EGG_SERVER_ENV dev
ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev

# Update Container
RUN apk update
#RUN apk add --update pm2
RUN npm install pm2 -g
RUN apk add --no-cache bash

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json package-lock.json ./

# Install all Packages
RUN npm install

# Copy all other source code to work directory
COPY . ./

# Start the app
Run npm run build

# Start
# CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
CMD ["npm", "start"]

EXPOSE 5000


