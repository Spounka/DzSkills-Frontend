FROM node:latest

WORKDIR /code
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . .
RUN npm run build