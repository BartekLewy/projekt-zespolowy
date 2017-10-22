FROM node:boron

RUN mkdir -p /code
WORKDIR /code/

RUN npm install -g gulp-cli
RUN npm install -g nodemon

COPY ./ /code/
RUN npm install
