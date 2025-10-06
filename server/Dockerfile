FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g npm@11.6.1
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
