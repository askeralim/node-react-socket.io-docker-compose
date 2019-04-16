# stage: 1
FROM node:8 as chatapp-build
WORKDIR /app
COPY . ./
RUN npm install
#RUN yarn
#RUN yarn build

CMD ["npm", "start"]
# stage: 2 — the production environment
#FROM nginx:alpine
#COPY — from=chatapp-build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD [“nginx”, “-g”, “daemon off;”]
