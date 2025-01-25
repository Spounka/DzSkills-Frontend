FROM node:20-alpine AS base

WORKDIR /code
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

FROM base AS dev
WORKDIR /code
COPY --from=base /code/node_modules /code/node_modules

COPY . .
RUN npm run build

FROM nginx:alpine3.18-slim

WORKDIR /var/www/dzskills/
COPY --from=dev /code/dist/ .
COPY ./nginx/nginx-setup.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
