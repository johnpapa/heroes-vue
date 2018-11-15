# Client App
FROM node:10.13-alpine as client-app
LABEL authors="John Papa"
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
ARG VUE_APP_API
ENV VUE_APP_API $VUE_APP_API
RUN npm run build

# Node server
FROM node:10.13-alpine as node-server
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY server.js .

# Final image
FROM node:10.13-alpine
WORKDIR /usr/src/app
# get the node_modules
COPY --from=node-server /usr/src /usr/src
# get the client app
COPY --from=client-app /usr/src/app/dist ./public
EXPOSE 9626
CMD ["node", "server.js"]
