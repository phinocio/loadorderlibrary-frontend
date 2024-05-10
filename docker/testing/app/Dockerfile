FROM node:20-alpine3.19 as build-testing-node

WORKDIR /app

RUN mkdir -p dist/

COPY package*.json /app/
RUN npm ci

COPY . .
RUN npm run build

##########################################################
# Testing Node
FROM node:20-alpine3.19 as app-testing

WORKDIR /app

COPY --from=build-testing-node /app/build /app/build
COPY package*.json /app/
COPY .env /app/.env

RUN npm ci --omit dev

CMD PROTOCOL_HEADER=x-forwarded-proto HOST_HEADER=x-forwarded-host node -r dotenv/config build
