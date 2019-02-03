FROM node:alpine

ENV NPM_CONFIG_LOGLEVEL warn

ARG app_env

ENV APP_ENV $app_env

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./app ./

RUN yarn install

CMD ["yarn", "start"]
