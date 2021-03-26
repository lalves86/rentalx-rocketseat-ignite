FROM node

WORKDIR /usr/app

COPY package.json ./

RUN yarn add

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
