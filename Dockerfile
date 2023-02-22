FROM debian:latest

LABEL maintainer="dany"
WORKDIR /usr/src/app
RUN apt-get update
RUN apt-get -y install autoconf automake libtool nasm make pkg-config git apt-utils
RUN apt-get -y install  npm 
# copy package.json and package-lock.json and install packages. we do this
# separate from the application code to better use docker's caching
# `npm install` will be cached on future builds if only the app code changed
COPY package*.json ./
RUN npm install
# copy the app
COPY . .

# expose port 3000 and start the app
EXPOSE 3000
RUN npm run deploy
