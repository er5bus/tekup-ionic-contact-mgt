FROM node:12-alpine3.11

LABEL MAINTAINER="Rami Sfari <rami2sfari@gmail.com>"

# install dependencies & set working directory
COPY ./package.json /app/
WORKDIR /app
RUN ["yarn"]

# Copy project
COPY . /app/

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 8100

# start the container
CMD ionic serve
