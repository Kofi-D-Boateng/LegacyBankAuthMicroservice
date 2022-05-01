FROM node:latest

EXPOSE 8081

WORKDIR /local/legacyBankAuth

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]