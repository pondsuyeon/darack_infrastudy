FROM node:10.15-alpine

RUN mkdir -p /app

WORKDIR "/app"

COPY package*.json ./

RUN npm install
RUN npm install redis
RUN npm install JSON
COPY . .
EXPOSE 4000
CMD ["npm","run","start"]