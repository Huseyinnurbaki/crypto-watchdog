FROM node:12.14.1-alpine AS BASEIMAGE

RUN apk update && apk add curl bash tzdata && rm -rf /var/cache/apk/*

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prebuild && npm run build && npm prune --production

RUN /usr/local/bin/node-prune


FROM node:12.14.1-alpine

WORKDIR /src
ENV TZ=Europe/Istanbul

COPY --from=BASEIMAGE /src/dist /src/dist
COPY --from=BASEIMAGE /src/node_modules /src/node_modules
EXPOSE 3000

CMD ["node", "dist/main.js"]