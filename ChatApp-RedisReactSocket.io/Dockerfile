FROM node:latest

WORKDIR /home/nodejs/app
COPY . .
RUN npm install --production
RUN npm start
CMD ["node", "server_socket.js"]
