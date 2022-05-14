FROM node:16.6-alpine

EXPOSE 8081

WORKDIR /local/legacyBankAuth

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]