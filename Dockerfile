FROM node:16.6-alpine

RUN mkdir -p /lb-auth

WORKDIR /lb-auth

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]