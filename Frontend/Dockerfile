FROM docker.io/library/node:18-alpine

EXPOSE 5173

WORKDIR /app

COPY . .

RUN yarn install

CMD ["yarn", "serve"]