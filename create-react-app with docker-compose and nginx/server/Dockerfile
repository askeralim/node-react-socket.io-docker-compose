# stage: 1
FROM node:8 as react-app-dc-build
WORKDIR /app
COPY package.json /app
RUN npm install

CMD ["npm", "start"]

