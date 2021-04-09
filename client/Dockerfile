FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build:ssr
RUN ls -la

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist dist

EXPOSE 80
ENV PORT 80
ENTRYPOINT node dist/client/server/main.js
