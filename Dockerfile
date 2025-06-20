FROM node:22-alpine AS deps-api
WORKDIR /api
COPY api/package*.json ./
RUN npm ci –only=production

FROM node:22-alpine AS deps-web
WORKDIR /web
COPY web/package*.json ./
COPY web/jst-ui-0.0.32.tgz ./
RUN npm ci –only=production

FROM node:22-alpine AS build-api
WORKDIR /api
COPY --from=deps-api /api/node_modules ./node_modules
COPY --from=deps-api /api/package*.json ./
COPY api/src ./src
COPY api/tsconfig.build.json ./
COPY api/tsconfig.json ./
RUN npm run build

FROM node:22-alpine AS build-web
WORKDIR /web
COPY --from=deps-web /web/node_modules ./node_modules
COPY /web/package*.json ./
COPY /web/src ./src
COPY /web/angular.json ./
COPY /web/tsconfig.app.json ./
COPY /web/tsconfig.json ./
COPY /web/tsconfig.spec.json ./
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build-web /web/dist/mock-helper/browser ./public
COPY --from=deps-api /api/node_modules ./node_modules
COPY --from=build-api /api/dist ./src
COPY api/.env ./
COPY api/db ./db


EXPOSE 3000
CMD [ "node", "src/main" ]