FROM node:20-alpine3.19 as build-prod-node

WORKDIR /app

RUN mkdir -p dist/

COPY package*.json /app/
RUN npm ci

COPY . .
RUN npm run build

##########################################################
# Testing Node
FROM node:20-alpine3.19 as app-prod

WORKDIR /app

COPY --from=build-prod-node /app/build /app/build
COPY package*.json /app/

RUN npm ci --omit dev

CMD PROTOCOL_HEADER=x-forwarded-proto HOST_HEADER=x-forwarded-host node -r dotenv/config build
