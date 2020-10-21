FROM node:12.19.0

WORKDIR /home/project/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

ENTRYPOINT ["npm", "run dev"]
