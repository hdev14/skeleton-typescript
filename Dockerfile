FROM node:12.19.0-alpine3.12

WORKDIR /home/project/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444
