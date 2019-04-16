# stage: 1
FROM node:8 as chat-app-dc-build
WORKDIR /app
COPY package.json /app
RUN npm install

CMD ["npm", "start"]
