# Base Stage/Layer
FROM node:10.16-alpine as node-layer
WORKDIR /usr/src/app

# Client App
FROM node-layer as client-app
LABEL authors="John Papa"
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
# COPY package*.json ./
RUN npm install --silent
COPY . .
ARG VUE_APP_API
ENV VUE_APP_API $VUE_APP_API
RUN npm run build

# Node server
FROM node-layer as node-server
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
# COPY package*.json ./
RUN npm install --production --silent && mv node_modules ../
COPY server.js .

# Final image
FROM node-layer
WORKDIR /usr/src/app
# get the node_modules
COPY --from=node-server /usr/src /usr/src
# get the client app
COPY --from=client-app /usr/src/app/dist ./public
EXPOSE 9626
CMD ["node", "server.js"]
