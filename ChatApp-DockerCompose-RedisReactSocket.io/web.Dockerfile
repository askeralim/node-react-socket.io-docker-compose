FROM node:latest

WORKDIR /home/docker/app
COPY . .
RUN npm install --production
RUN node server.js &
CMD ["npm", "start"]
