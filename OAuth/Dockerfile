FROM docker.io/library/node:18-alpine

EXPOSE 5273

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]