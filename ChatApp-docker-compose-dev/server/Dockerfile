# stage: 1
FROM node:8 as chat-app-server-build
WORKDIR /app
COPY . /app
RUN npm install 
CMD ["node", "server.js"]
