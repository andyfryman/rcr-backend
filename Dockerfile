ARG NODE_TAG=14
FROM node:${NODE_TAG}
WORKDIR /usr/src/app/api
COPY ./api/package*.json ./
RUN npm install
COPY ./api ./
CMD [ "npm", "start" ]