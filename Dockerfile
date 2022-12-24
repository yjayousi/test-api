FROM node:16
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install

# copy and build app
COPY ./ ./

RUN yarn install && yarn build

# Bundle app source
COPY ./src /app/src

CMD ["yarn", "start:prod"]