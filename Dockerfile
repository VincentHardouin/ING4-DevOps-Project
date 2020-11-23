FROM node:12.19.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm ci \
    && apk del .gyp

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
