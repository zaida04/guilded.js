FROM node:20-alpine
LABEL name "guildedjs rest proxy builder"
WORKDIR /opt/build

RUN apk add --update \
&& apk add --no-cache --virtual .build-deps curl \
&& corepack enable && corepack prepare pnpm@8.6.3 --activate

COPY tsconfig.json package.json bun.lockb ./
COPY ./packages/api/. ./packages/api/

COPY ./services/proxy/package.json ./services/proxy/tsconfig.json ./services/proxy/
RUN pnpm install -r --frozen-lockfile

COPY ./services/proxy/src/. ./services/proxy/src/
RUN pnpm run build && rm -rf node_modules/ && pnpm install --prod --ignore-scripts

FROM node:20-alpine
LABEL name "guildedjs rest proxy"
WORKDIR /usr/app

COPY --from=0 ./opt/build ./

WORKDIR /usr/app/services/proxy
CMD ["node", "dist/index.js"]