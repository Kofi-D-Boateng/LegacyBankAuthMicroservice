FROM node:16.6-alpine

WORKDIR /usr/lb-auth

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]