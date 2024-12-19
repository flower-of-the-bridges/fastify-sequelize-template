FROM node:22.12.0-alpine AS build

ENV NODE_ENV=production

WORKDIR /build-dir

COPY package.json .
COPY package-lock.json .

# install only dependencies required to run the service
RUN npm ci --omit=dev

COPY src src

#############################################################

FROM node:22.12.0-alpine

RUN apk add --no-cache tini

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY --from=build /build-dir ./

USER node

ENTRYPOINT ["/sbin/tini", "--"]

CMD ./node_modules/.bin/tsx src/index.ts

