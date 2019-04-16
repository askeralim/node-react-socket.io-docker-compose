FROM node:latest

WORKDIR /home/nodejs/app
COPY . .
RUN npm install --production
RUN node server.js &
CMD ["npm", "start"]
