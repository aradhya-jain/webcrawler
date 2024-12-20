FROM node:22-alpine3.20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY src/ ./src/

EXPOSE 3000

CMD ["npm", "start"]