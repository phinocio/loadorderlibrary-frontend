# Development build NPM
FROM node:20-alpine3.18 as build-dev-node

WORKDIR /app

RUN mkdir -p dist/

COPY package*.json /app/
RUN npm ci

COPY . .
RUN npm run build

##########################################################
# Dev Node
FROM nginx:1.25.1-alpine as app-dev

COPY --from=build-dev-node /app/dist /var/www/public
COPY ./docker/dev/app/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/dev/app/conf.d/default.conf /etc/nginx/conf.d/default.conf