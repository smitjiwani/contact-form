FROM node:20.7.0-alpine

WORKDIR /app

ADD package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]