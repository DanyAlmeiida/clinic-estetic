FROM debian:latest

LABEL maintainer="dany"
WORKDIR /usr/src/app

COPY package*.json ./
COPY ./build ./ 
# copy the app
COPY . .

# expose port 3000 and start the app
EXPOSE 3000
CMD ["npm", "run", "deploy"]
