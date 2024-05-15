FROM node:20-alpine3.19 as build-dev-node

WORKDIR /app

RUN npm install -g pnpm

COPY package.json /app/
COPY pnpm-lock.yaml /app/
RUN pnpm install

COPY . .
RUN pnpm run build

RUN rm -rf node_modules

RUN pnpm install --prod

##########################################################
# Dev Node
FROM node:20-alpine3.19 as app-dev

WORKDIR /app

COPY --from=build-dev-node /app/build /app/build
COPY --from=build-dev-node /app/node_modules /app/node_modules
COPY package*.json /app/
COPY .env /app/.env

CMD PROTOCOL_HEADER=x-forwarded-proto HOST_HEADER=x-forwarded-host node -r dotenv/config build
