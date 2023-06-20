# Development build NPM
FROM node:20-alpine3.18 as build-testing-node

WORKDIR /app

RUN mkdir -p dist/

COPY package*.json /app/
RUN npm ci

COPY . .
RUN npm run build

##########################################################
# Dev Node
FROM nginx:1.25.1-alpine as app-testing

COPY --from=build-testing-node /app/dist /var/www/public
COPY ./docker/testing/app/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/testing/app/conf.d/default.conf /etc/nginx/conf.d/default.conf
