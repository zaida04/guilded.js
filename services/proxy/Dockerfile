FROM node:19-alpine
LABEL name "guildedjs rest proxy builder"
WORKDIR /opt/build

RUN apk add --update \
&& apk add --no-cache --virtual .build-deps curl \
&& curl -L https://unpkg.com/@pnpm/self-installer | node

COPY tsconfig.json package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./packages/rest/. ./packages/rest/
COPY ./packages/guilded-api-typings/. ./packages/guilded-api-typings/.

COPY ./services/proxy/package.json ./services/proxy/tsconfig.json ./services/proxy/
RUN pnpm install -r --frozen-lockfile

COPY ./services/proxy/src/. ./services/proxy/src/
RUN pnpm run build && rm -rf node_modules/ && pnpm install --prod --ignore-scripts

FROM node:19-alpine
LABEL name "guildedjs rest proxy"
WORKDIR /usr/app

COPY --from=0 ./opt/build ./

WORKDIR /usr/app/services/proxy
CMD ["node", "dist/index.js"]